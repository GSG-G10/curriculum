## database-testing-workshop

Based on FAC [original workshop](https://github.com/foundersandcoders/ws-database-testing).

----


## Contents
<!-- generated using markdown-toc
$ npx markdown-toc README.md
-->
- [database-testing-workshop](#database-testing-workshop)
- [Contents](#contents)
- [Learning Objectives](#learning-objectives)
- [Why do we need a test database?](#why-do-we-need-a-test-database)
- [Let's go!](#lets-go)
  - [1. Create a test database](#1-create-a-test-database)
  - [2. Configure the `connection` file](#2-configure-the-connection-file)
  - [3. Create the test script](#3-create-the-test-script)
  - [4. Turn the db build script into a reusable function](#4-turn-the-db-build-script-into-a-reusable-function)
  - [5. Write tests!](#5-write-tests)
- [Additional Info](#additional-info)

## Learning Objectives

To be able to:

* Create and set up a test database
* Test database queries

## Why do we need a test database?

In this workshop we will create a test database to run our tests on, which is separate from our production database. We use a test database so that we can add, delete, or update data in our tests without affecting our production database.

## Let's go!

* Clone this repo
* Navigate to it in your terminal and run `npm i`

We are going to start by creating a test database for us to run our tests on.

### 1. Create a test database

Set up your test database:

   This workshop is based on the
   [pg-workshop](https://github.com/ali-7/pg-workshop) we've just
   completed. That's why we assume that you've already set up your local
   database. Create `.env` and copy the database url from
   [pg-workshop](https://github.com/ali-7/pg-workshop) in it.

* Now we have to set up a test database and add its url to `.env`.

  _Follow these steps if you have doubts how to set up a database:_

___________________________________________________________________________________
 In terminal type psql, or pgcli if installed. Within psql/pcli enter the
following commands each followed by a return. Things in square brackets are for
your desired values. Note that password is a string inside '' (NOT double quotes
-> ""):

```
CREATE DATABASE [db_name];
CREATE USER [user_name] WITH SUPERUSER PASSWORD ['password'];
ALTER DATABASE [db_name] OWNER TO [user_name];
```

___________________________________________________________________________________

Now you can set the test database url in your `.env` as follows (setting the
values in square brackets to the values you defined in the steps above):

`TEST_DB_URL = postgres://[user_name]:[password]@localhost:5432/[db_name]`

* Next open psql/pgcli in terminal and connect to your test database: `\c
  [test_database_name]`
* Next you will run the `build.sql` file to create the schema and populate your
  test database with data: `\i [full_path_to_build.sql]` (To easily copy a
  file's full path right click on it in atom and click on "Copy Full Path")

* Your `.env` will now contain:
  ```
  DB_URL = postgres://[user_name]:[password]@localhost:5432/[db_name]
  TEST_DB_URL = postgres://[test_db_user_name]:[test_db_password]@localhost:5432/[test_db_name]
  ```
### 2. Configure the `connection` file

* Now we have to specify in which cases we use the real database and in which
  cases we use the test one. To do that we have to set up a `NODE_ENV` variable:

> NODE_ENV is an environment variable popularized by the Express framework. It
> specifies the environment in which an application is running such as
> development, staging, production, testing, etc.
>
> By default, our application will run in development environment. And we can
> change the environment by changing process.env.NODE_ENV.

In `connection.js` add this condition:

```js
let dbUrl = "";

if (process.env.NODE_ENV === "test") {
  dbUrl = process.env.TEST_DB_URL;
} else {
  dbUrl = process.env.DB_URL;
}
```

And don't forget to replace the existing similar code with these changes:

```js
if (!dbUrl) throw new Error("No Database URL!!!");

connectionString: dbUrl,
```
### 3. Create the test script

Create a tests folder:

* Create a `tests` folder in the root folder.
* Create file `test.js` in `tests`.

Then add a script in `package.json` to run your
tests: `"test": "NODE_ENV=test jest"` When you want to run your
tests, run `npm test` in your terminal.

### 4. Turn the db build script into a reusable function

* We are almost ready to write the tests. An important idea to keep in mind is
  that before running the tests we need to make sure that our test database is
  at its default state. That's why before running every single test we have to
  rerun the script from `build.js` to reset the database.

* To do this we need to turn the script into a function, `dbBuild`, and export it. Then we can import it in the test file and build the database before running the tests.

```js
// before:

// const sql = readFileSync(join(__dirname, "build.sql")).toString();

// connection
//   .query(sql)
//   .then(() => console.log("build created successfully!"))
//   .catch(e => console.error('failed to build', e.stack));

// after:

const dbBuild = () => {
  const sql = readFileSync(join(__dirname, "build.sql")).toString();
  return connection.query(sql);
};

module.exports = { dbBuild };
```

### 5. Write tests!

* In your `tests.js` require the connection, `dbBuild` function and queries that you are
  going to test:

```js
const connection = require('../server/database/config/connection.js');
const { dbBuild } = require("../server/database/config/build");
const { getData } = require("../server/database/queries/getData");
const { postData } = require("../server/database/queries/postData");
```

* Check that jest is working by running this test:

```js
test("jest is working", () => {
  expect(1).toBe(1);
});
```

* You are ready to test database queries! Remember that before every test you
  have to restart the test database by calling `dbBuild` function. Now you should write a test for `getData()` function that exists in `queries/getData.js`

```js
test("test getData query", () => {
  query()
    .then()
    .catch()
});

```
* you need to use [jest global functions](https://jestjs.io/docs/en/setup-teardown)  to run things before and after the tests
  add these 
  ```js
  beforeAll(()=>{
    return buildDB();
  });
  afterAll(()=>{
    return connection.end();
  });
  ```
<!-- * add on the end of the file, under all tests
  ```js
  tape.onFinish(() => process.exit(0));
  ```
  - this will be the last line of the test file 
    > The onFinish hook will get invoked when ALL tape tests have finished
    > right before tape is about to print the test summary.
  - try to run your `tests` without this line and notes what will happen! -->
   
* Write a test for `postData` query .

## Additional Info

On larger projects we may want to have a `test_build.sql` so that we can have a range of fake data in our test database to test on.

Original data should be exists in `build.js` file. To use it, you should create development database at first, then connect with development databas inside `connection.js` file.
```js
if (process.env.NODE_ENV === "test") {
  dbUrl = process.env.TEST_DB_URL;

}else if (process.env.NODE_ENV === "development") {
  dbUrl = process.env.DEVELOPMENT_DB_URL;
}else {
  // do something
}
```

 To do this our `build.js` file will need to check which sql script it needs to run.
```js
if ((process.env.NODE_ENV = "test")) {
  sql = readFileSync(join(__dirname, "test_build.sql")).toString();
} else {
  sql = readFileSync(join(__dirname, "build.sql")).toString();
}
```

This will specify which file to use based on whether it's in a test environment
or not.
