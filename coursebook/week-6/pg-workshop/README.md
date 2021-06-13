## pg-workshop


Inspired and based on [Shireen Zoaby](https://github.com/shiryz) [original workshop](https://github.com/foundersandcoders/pg-workshop) and converted it to use express and promises.

----

In this workshop we'll be building on what we learnt in the [pg code along](https://github.com/ali-7/pg-code-along). This app currently contains static data on users' name and location. We'll be setting up our own database connection so that the data can be retrieved from a table of "users" instead. We'll also want to write code that enables us to add new users via a form.

## Getting started

1.  Clone this repo
2.  Install the node_modules by typing `npm i` in your terminal.
3.  Run `npm run dev`in your terminal and checkout the result at http://localhost:5000. This is the starting template for what you'll be building.
4.  In `server/controllers/index.js` you'll see  `/users` endpoint. The data is currently coming from the `static.js` file. Add your own name and location within `static.js`. Refresh the page & check the results.

### Task 1: Setting up the database

We are currently hard-coding the data in to the application (`static.js`) because we don't have a database. Now we want to replace `static.js` with an actual database. Let's start by setting up the database we will connect to.

1.  Connect to postgres, by typing `psql` or `pgcli` in the terminal.
2.  use these commands to create your database
    ```
    CREATE DATABASE db_name;
    CREATE USER user_name WITH SUPERUSER PASSWORD 'password';
    ALTER DATABASE db_name OWNER TO user_name;
    ```
3.  Add a `config.env` file and add the database's url in this format: `DB_URL = postgres://[username]:[password]@localhost:5432/[database]`. 

### Task 2: Getting data from the database

Your job now is to add to `database/config/connection.js` and `database/queries/getData.js` and refactor your `controllers/index.js` so that the response data comes from the users table in your database instead of from `static.js`.

1.  In the terminal, connect to your database using `pgcli postgres://[username]:[password]@localhost:5432/[database]`.
2.  Create a table called 'users' with three columns: 'id', 'name' and 'location' and add a couple of rows of dummy data. **Hint: don't hard code the ids**
3.  Inside `database/queries/getData.js`, write a SQL query that pulls the necessary data from your database.
4.  Change the `/users` function  in `controllers/index.js` to call the `getData` query.

### Task 3: Adding data to the database

So far, we've only been dealing with `GET`ting data from a server. But what if we want users to be able to add their details to our database?

As we still don't have a visible form in the front end, only a developer can add to the database, either through `psql` in the command line, or by adding `.sql` files to this repo. Let's change that.

In the commented out form in `index.html` we have this HTML attribute: `action="create-user"`. When a user clicks 'submit' on this form, the details they have entered will be sent in the payload to a `create-user` endpoint.

1.  Open up `index.html` and uncomment the form
2.  Check that you can see an empty input box when you refresh your browser
3.  Inside `database/queries/postData.js`, write a SQL query that insert the necessary data into your database.
3.  Add a new endpoint to your `router` (`/create-user`) and find the way to handle it.


### Bonus

Style it up!

- Try and get the design looking as close as possible to the below:

![css-challenge](https://user-images.githubusercontent.com/20152018/28717127-6a22b320-7398-11e7-895e-a0e4cc67ebf5.png)

