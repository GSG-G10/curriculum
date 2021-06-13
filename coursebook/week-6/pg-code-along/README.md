# pg-code-along

Inspired by [Shireen Zoaby](https://github.com/shiryz) [original workshop](https://github.com/foundersandcoders/pg-walkthrough) and converted it to use express and promises and the WHATWG URL API.

## Learning Outcomes

**Building a database**
- Creating a build script in an `.sql` file
- Using the DROP and IF EXISTS commands, for use on a `test database`
- What cascade is for and when to use it
- Execute a transaction using BEGIN & COMMIT

**Connecting to a database**
- Connecting to a PostgreSQL server from a node server, including the setup of environment variables (heroku)

**Running queries in Node**
- Understanding what a connection pool is and how to initialise and configure one using pg
- Using pool.query with promises, to execute single queries to the database
- Serving the query results to the front end


# Postgres Connection Walkthrough

This exercise is designed to get you familiar with connecting to a database, querying it and viewing that information.
We'll be using the [npm module *pg*](https://www.npmjs.com/package/pg) - documentation [here](https://node-postgres.com/) - to connect our node server to a locally-hosted Postgres database.
