# pg code along walkthrough notes

This workshop is intended to be delivered as a code-along. This file contains the mentor notes, and the `step-*` folders in the same directory as this file contain the correct code after the corresponding step. There is no `step-1` folder as step 1 is simply inspecting the files. The students should code in the root directory.

## Getting Started
```sh
git clone https://github.com/ali-7/pg-code-along.git
```

## Step 1 – Navigating the initial files
1. Open `server/controllers/index.js`.
    - Here we see the `/static` endpoint reads and serves data from file called `static.js`.

2. Open `server/controllers/static.js`
    - We see that it contains a data array with two superhero objects.

3. Run `npm run dev` in command line and navigate to `http://localhost:3000/static` in the browser.
    - Here we see our hardcoded, static, data from `static.js`.
    - Storing/loading dynamic data in files is bad, because file I/O is inefficient and should just be used for server load/config data.

## Step 2 – Setting up the database
1. Create a folder inside the root project: `database`.
    - In the folder `database`, we're going to setup the structure/schema of our database, and hardcoded data.

2. Create a new file: `database/build.sql`.
    1. Put a `BEGIN;` at the start of the file and a `COMMIT;` at the end of the file.
        - Clarify that the init queries should be written between these lines (so BEGIN and COMMIT wrap around them).
        - The code inside it is a transaction, so the multiple queries are run as one query/chunk. If an error occurs inside of here, it will rollback the previous commands, preventing messing up the database. Can think of it as SQL error handling

    2. Write `DROP TABLE IF EXISTS superheroes CASCADE;`.
        - This line drops our database each time this file is run.
        > ONLY RUN IT ONCE. This file should never be used in production other than for initialisation. You only want to use this to reset your test database (and can add mock data for it).

         To update your schema, you can create separate update scripts.
        - Cascade will delete tables with relations (that have a REFERENCE defined towards) to `superheroes` too.

    3. Write the schema:
        ```sql
        CREATE TABLE superheroes (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          superPower TEXT NOT NULL,
          weight INTEGER DEFAULT 100
        );
        ```

        - All tables should have an integer `id` that is set as a `PRIMARY KEY` - this is used relate databased together (integer PRIMARY KEY helps with performance)
        - `PRIMARY KEY` also adds `UNIQUE` and `NOT NULL` (primary keys have to be unique).
        - `VARCHAR(LENGTH)`, `INTEGER`, `TEXT` (unlimited length, but larger data usage), etc are SQL data types.
        - `NOT NULL` tells the PostgreSQL to give an error if this is not set.
        - `DEFAULT 100` changes `NULL` values to be `100`.

    4. Initialise some mock/hardcoded data:
        ```sql
        INSERT INTO superheroes (name, superPower, weight) VALUES
          ('Wolverine', 'Regeneration', 300),
          ('Captain Marvel', 'Shoots concussive energy bursts from her hands', 165),
          ('Iron Man', 'None', 425);
        ```

        - Rows separated with commas and each bracket, `(comma-separated values inside here)`, has a row inside it with values

## Step 3 – Creating the database

We will be using an autocomplete client `pgcli`, [reference here](https://github.com/macintoshhelper/learn-sql/blob/master/postgresql/setup.md#bonus---installing-an-autocomplete-client)

We will be using these commands to create our database and user for it.

> Note that password is a string inside '' (NOT double quotes "")

```
CREATE DATABASE db_name;
CREATE USER user_name WITH SUPERUSER PASSWORD 'password';
ALTER DATABASE db_name OWNER TO user_name;
```

1. In your command line, run `pgcli`.

2. Create the database by typing `CREATE DATABASE film;` into your Postgres CLI client.

3. Create a user specifically for the database with a password by typing `CREATE USER [the new username] WITH SUPERUSER PASSWORD '[the password of the database]'`;

4. Change ownership of the database to the new user by typing `ALTER DATABASE db_name OWNER TO user_name;`.

5. Add a config.env file and add the database's url in this format: `DB_URL = postgres://[username]:[password]@localhost:5432/[database]`
    - Don't use semi-colons or apostrophes for strings in `config.env`, or use alternative JSON notation

6. Try connecting to the database by typing `pgcli postgres://[username]:[password]@localhost:5432/[database]`.

If you experience permission problems, try running `pgcli film` then `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO [the new username];`

## Step 4 – Connecting and building the database
Pg is a non-blocking PostgreSQL client for node.js that lets you access SQL values as JavaScript data values. Translates data types appropriately to/from JS data types.

Our database is now outlined, but we need a way to connect it

1. Create a new file: `database/connection.js`.

2. Install the npm packages `pg` and `env2`: `npm i pg env2`

3. Import `Pool` and `env2`:
    ```js
    const { Pool } = require('pg');
    require('env2')('./config.env');

    if (!process.env.DB_URL) throw new Error('No Database URL!!!');
    ```

    - `{ Pool }` is syntactic sugar (shorten/simplify syntax with abstraction) ([destructuring assignment](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)) that is equivalent to:
        ```js
        const pg = require('pg');
        const Pool = pg.Pool;
        ```

    - [`Connection pooling`](https://en.wikipedia.org/wiki/Connection_pool) is a cache of multiple database connections that are kept open for a timeout period (`idleTimeoutMillis`) and reused when future requests are required, minimising the resource impact of opening/closing connections constantly for write/read heavy apps. Reusing connections minimises latency too. Debug/demo logging `Pool` might be helpful.
    - Here we are requiring `config.env` that we created and has the `DB_URL` in it.
    - This is a *gitignored* file with environment variables which are accessed with `process.env.NAME_HERE` and can be set in `config.env` *OR* production environments with `Heroku`
    - The if statement will deliberately crash the script if the _connection information_ variable is missing

4. Parsing the URL string using the WHATWG API :
    ```js
    const params = new URL(process.env.DB_URL);
    ```

    - `console.log('DB_URL:', params)` to see the URL object.
    - [node URL Strings and URL Objects](https://nodejs.org/api/url.html#url_url_strings_and_url_objects)
    - don't use the `Legacy URL API` to parse the any URL its `Deprecated`.

5. Create a [`pg options`](https://node-postgres.com/features/connecting#programmatic) object:
    ```js
    const options = {
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      max: process.env.DB_MAX_CONNECTIONS || 2,
      user: params.username,
      password: params.password,
      ssl: params.hostname !== 'localhost'
    };
    ```

    - Use an appropriate number for `max`. More connections mean more memory is used, and too many can crash the database server. Always return connections to the pool (don't block/freeze query callbacks), or the pool will deplete. More connections mean more queries can be run at once and more redundancy incase connections are blocked/frozen.
    - `ssl` will enable SSL (set to true) if you're not testing on a local machine.
        - TLS / SSL (Secure Sockets Layer) ensures that you are connecting to the database from a secure server, when set to `true`, preventing external networks from being able to read/manipulate database queries with MITM attacks

6. Export the Pool object with options with:
    ```js
    module.exports = new Pool(options);
    ```

    - This exports the Pool constructor/object with the previously set options object, for other files to use this connection pool with `dbConnection.query` where `dbConnection` is the exported `Pool`.
    - another way to use the [pg-connection-string](https://github.com/iceddev/pg-connection-string).

		```js
		const options = {
  		  connectionString : process.env.DB_URL,
  		  ssl: true
		};
		```

7. Create a file: `database/build.js` with this code:
    ```js
    const { readFileSync } = require("fs");
    const { join } = require("path");

    const connection = require("./connection");

    const sql = readFileSync(join(__dirname, "build.sql")).toString();

    connection
     .query(sql)
     .then(() => console.log("build created successfully!"))
     .catch(e => console.error('failed to build', e.stack));
    ```

    - Where `fs` is the Node file system module.
    - `connection` is the previously exported pool object.
    - `sql` is a string of the build script. Think of it as a single query (transaction / collection of queries compiled into one).
    - For getting data, `connection.query` take `sql` string and returns a `promise` with the result if you want to use them, you can add them to `then` argument.
    - `catch` returns any `error` that happens while building the `sql` file.
    - This file should only be run **separately**. NEVER run this in a production after setup, or from other files (unless you know what you're doing).

8. Now we build the tables we set out in `build.sql` by running our `build.js` file by running: `node server/database/build.js` in command line.

9. Now go to your Postgres CLI client and test if everything worked by typing `SELECT * FROM superheroes;`. You should see the data we entered in `build.sql` appear.

## Step 5 – connecting to our database from the server
Let's first write a file that gets our information from the database.


1. Create a file `controllers/dynamic.js`.

2. Import `connection.js`:
    ```js
    const dbConnection = require("../database/connection");
    ```

3. Write an asynchronous `getData` function that returns a promies .
    ```js
   const getData = () => {
     return dbConnection.query(`SELECT * FROM superheroes;`);
   };
    ```

    - note that `pool.query` returns a promies, [doc here](https://node-postgres.com/features/queries)

4. Export `getData`:
    ```js
    module.exports = { getData };
    ```

5. Go to `controllers/index.js` and import `dynamic.js` as `dynamicSuperHeroes`:
    ```js
    const dynamicSuperHeroes = require("./dynamic");
    ```
6. Create `/dynamic` endpoint and call `getData` to send the result.
    ```js
    router.get("/dynamic", (req, res) => {
      dynamicSuperHeroes
        .getData()
        .then(result => {
          res.json(result.rows);
        })
        .catch(err => console.log(err));
    });
    ```
    - as we said `getData` will return a promise now with the results that we need.
    - `console.log(result.rows)`
    - `res.json(result.rows);` to send the data to the front.

7. Navigate to `http://localhost:3000/dynamic` to check it's worked.
