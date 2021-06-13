# SQL Commands Introduction

In this workshop we will be learning SQL by running commands in our terminal.

## Getting Started

Make sure you have [installed and setup PostgreSQL](https://github.com/macintoshhelper/learn-sql/blob/master/postgresql/setup.md).

We'll be using `psql`, the Postgres command-line interface. This lets you run SQL queries and also provides some extra commands for working with the databse. These extras start with a backslash character (e.g. `\c`) whereas SQL is usually uppercase (e.g. `CREATE DATABASE`).

**Important**: SQL commands need a semicolon at the end of the line. This is not optional and stuff will break if you forget it.

### Setting up the workshop database

Clone this repo and `cd` into it. Type `psql` in your terminal to enter the Postgres command-line interface. You can type `ctrl-d` to exit this at any time.

To create a database we use the `CREATE DATABASE` command and give it whatever name you like:

```sql
CREATE DATABASE blog_workshop;
```

You should now be able to use the `\list` (or `\l` for short) `psql` command to list all the databases on your machine. Hopefully the new `blog_workshop` is there. You can type `q` to exit this view.

You can then connect to our new database using the `\connect` (or `\c`) command:

```sh
\connect blog_workshop
```

Now you need to populate the database with some data. There's a bunch of pre-written SQL commands in the `init.sql` file. If you run this it will create some fake blog data in our new database.

You can use the `\include` (or `\i`) command to run some SQL from a file (which saves a lot of typing):

```sh
\include init.sql
```

If you run the `\dt` command you should see all the **d**atabase **t**ables we just created (`blog_posts`, `blog_comments` and `users`).

## Schema Info

This database represents the data for a blog. It has users who can write blog posts, and blog posts that can contain comments.

A blog post has to have an author, so each entry in `blog_posts` has a `user_id`, which `REFERENCES` an `id` in the `users` table. This links the two together, so for any given post we can always find the author.

Comments are linked to both a `user` and a `blog_post`, so they have two `REFERENCES`: `post_id` and `user_id`.

### `users`

| Column     | Type                                              | Constraints |
| ---------- | ------------------------------------------------- | ----------- |
| id         | SERIAL (translates to integer and AUTO_INCREMENT) | PRIMARY KEY |
| username   | VARCHAR(255)                                      | NOT NULL    |
| age        | INTEGER                                           |
| first_name | VARCHAR(255)                                      |
| last_name  | VARCHAR(255)                                      |
| location   | VARCHAR(255)                                      |

### `blog_posts`

| Column       | Type    | Constraints          |
| ------------ | ------- | -------------------- |
| id           | SERIAL  | PRIMARY KEY          |
| user_id      | INTEGER | REFERENCES users(id) |
| text_content | TEXT    |

### `post_comments`

| Column       | Type    | Constraints               |
| ------------ | ------- | ------------------------- |
| id           | SERIAL  | PRIMARY KEY               |
| post_id      | INTEGER | REFERENCES blog_posts(id) |
| user_id      | INTEGER | REFERENCES users(id)      |
| text_content | TEXT    |

### Data types

SQL requires us to specify what type of data we're going to use for each entry in advance.

#### `SERIAL`

An auto-incrementing number. Useful for IDs where each new entry needs a unique value.

#### `VARCHAR(255)`

This is a variable-length string. The number in brackets specifies the maximum number of characters.

#### `TEXT`

A string of any length.

#### `INTEGER`

A whole number (like `20`). No fractions allowed.

### Constraints

A way to provide additional fine-tuning of a data type. Think of it like input validation.

#### `NOT NULL`

This value is required and must always be set.

#### `PRIMARY KEY`

Indicates that this value is the unique identifier for this entry into the table (called a "row").

#### `REFERENCES`

Specifies that this value must match one in another table. The value it must match is specified after like this: `other_table_name(primary_key)`.

## Retrieving data

Here's a quick overview of some SQL commands used to retrieve data from a database.

### [`SELECT`](https://www.w3schools.com/sql/sql_select.asp)

Retrieves data from a table. You need to combine it with `FROM` to specify which table. For example:

```sql
SELECT first_name FROM users;
```

would retrieve the `first_name` column for every row in the `users` table.

| first_name |
| ---------- |
| Alisha     |
| Chelsea    |
| ...        |

Note you can provide comma-separated lists of column names and table names if you want to select multiple things. You can also use the `*` character to select all columns.

### [`WHERE`](https://www.w3schools.com/sql/sql_where.asp)

This is a clause that qualifies a `SELECT`. It lets you filter which rows are retrieved based on the values in that row. For example:

```sql
SELECT first_name FROM users WHERE id = 1;
```

would retrive the first name column for any users with an ID of `1`.

| first_name |
| ---------- |
| Alisha     |

### [`AND`, `OR` and `NOT`](https://www.w3schools.com/sql/sql_and_or.asp)

These are operators for expressing logic in your `WHERE` clauses. They let you apply multiple conditions. For example:

```sql
SELECT first_name FROM users WHERE id = 1 OR id = 2;
```

would retrieve the first name column for any users with an ID of `1` _or_ `2`.

| first_name |
| ---------- |
| Alisha     |
| Chelsea    |

### [`IN`](https://www.w3schools.com/sql/sql_in.asp)

This operator lets you match against a list of values in your `WHERE` clause. For example:

```sql
SELECT first_name FROM users WHERE id IN (1, 2);
```

would select the first name column for any users with an ID of `1` or `2`.

| first_name |
| ---------- |
| Alisha     |
| Chelsea    |

This is similar to the `OR` operator we saw above.

### Retrieving data challenges

1. #### Select specific columns

   Using [`SELECT`](https://www.w3schools.com/sql/sql_select.asp), retrieve a list of _only_ usernames and locations from the `users` table

   **Expected Result**

   | username  | location       |
   | --------- | -------------- |
   | Sery1976  | Middlehill, UK |
   | Notne1991 | Sunipol, UK    |
   | Moull1990 | Wanlip, UK     |
   | Spont1935 | Saxilby, UK    |

   <details>
   <summary>Solution</summary>

   ```sql
   SELECT username, location FROM users;
   ```

   </details>

1. #### Select users conditionally

   Using `SELECT` and [`WHERE`](https://www.w3schools.com/sql/sql_where.asp), retrieve every column for all users who are older than 40.

   ##### Expected Result

   | id  | username  | age | first_name | last_name | location    |
   | --- | --------- | --- | ---------- | --------- | ----------- |
   | 3   | Moull1990 | 41  | Skye       | Hobbs     | Wanlip, UK  |
   | 4   | Spont1935 | 72  | Matthew    | Griffin   | Saxilby, UK |

   <details>
   <summary>Solution</summary>

   ```sql
   SELECT * FROM users
     WHERE age > 40;
   ```

   </details>

1. #### Select users using multiple conditions

   Using `SELECT` and `WHERE`, retrieve the first, last name and location of the user who lives in `Saxilby, UK` and is older than 40.

   ##### Expected Result

   | first_name | last_name | location    |
   | ---------- | --------- | ----------- |
   | Matthew    | Griffin   | Saxilby, UK |

   <details>
   <summary>Solution</summary>

   ```sql
   SELECT first_name, last_name, location FROM users
     WHERE location = 'Saxilby, UK' AND age > 40;
   ```

   </details>

1. #### Select posts using multiple conditions

   Using `WHERE` and [`IN`](https://www.w3schools.com/sql/sql_in.asp), retrieve the user ID and text content columns for posts created by users with IDs of `2` or `3`.

   ##### Expected Result

   | user_id | text_content                                                          |
   | ------- | --------------------------------------------------------------------- |
   | 2       | Peculiar trifling absolute and wandered vicinity property yet. decay. |
   | 3       | Far stairs now coming bed oppose hunted become his.                   |

   <details>
   <summary>Solution</summary>

   ```sql
   SELECT user_id, text_content FROM blog_posts
     WHERE user_id IN (2, 3);
   ```

   </details>

## Creating and updating data

Here's an overview of SQL commands used to add data to a database.

### [`INSERT INTO`](https://www.w3schools.com/sql/sql_insert.asp)

Lets you add a new row into a table. You specify a table name and list of columns, then a list of values to insert. The values have to match positions with their respective columns (like function arguments in JS).

```sql
INSERT INTO users (username, first_name) VALUES ('oliverjam', 'oli');
```

would create a new user row with a username of `'oliverjam'` and first name of `'oli'`.

### [`UPDATE`](https://www.w3schools.com/sql/sql_update.asp)

Lets you change existing data in a table. You provide the table name, then the name and new value of each column. You also need to provide a `WHERE` clause to select which rows to update, otherwise **every** row will be changed.

```sql
UPDATE users SET first_name = 'oliver' WHERE username = 'oliverjam';
```

would update the first name of the user with username `"oliverjam"` to be `"oliver"`.

### `RETURNING`

You can access the created/changed rows with a `RETURNING` clause after your `INSERT` or `UPDATE`. This lets you query the inserted rows using the same syntax as a `SELECT`. It's primarily used to get auto-generated values like IDs without having to do a whole separate `SELECT` query.

```sql
INSERT INTO users (username, first_name) VALUES ('oliverjam', 'oli')
  RETURNING id, username;
```

Would return:

| id  | username  |
| --- | --------- |
| 1   | oliverjam |
| 2   | oli       |

### Creating and updating data challenges

1. #### Adding a new post

   Using [`INSERT INTO`](https://www.w3schools.com/sql/sql_insert.asp) and `RETURNING`, add a blog post with the text "Hello world" to the user with ID `1`. Return the text content and user ID of the inserted post.

   ##### Expected Result

   | text_content | user_id |
   | ------------ | ------- |
   | Hello World  | 1       |

   <details>
   <summary>Solution</summary>

   ```sql
   INSERT INTO blog_posts (text_content, user_id)
     VALUES ('Hello World', 1)
     RETURNING text_content, user_id
   ;
   ```

   </details>

1. #### Updating an existing post

   Using [`UPDATE`](https://www.w3schools.com/sql/sql_update.asp), update the blog post from the previous question to change the author to the user with ID `2`. **Make sure you don't change any other posts**.

   You can then run `SELECT user_id FROM blog_posts WHERE text_content='Hello world';` to test for the expected result.

   ##### Expected Result

   | user_id |
   | ------- |
   | 2       |

   <details>
   <summary>Solution</summary>

   ```sql
   UPDATE blog_posts SET user_id=2
     WHERE text_content='Hello World';
   ```

   </details>

## Combining tables

We can use [`JOIN`](https://www.w3schools.com/sql/sql_join.asp)s to select columns from multiple tables at once, based on a _relation_ they share. There are different types of joins that determine exactly what data is returned. Since we're selecting from multiple tables we must namespace our columns with the table name and a `.`, just like object access in JavaScript (e.g. `SELECT users.username, blog_posts.text_content`).

### [`INNER JOIN`](https://www.w3schools.com/sql/sql_join_inner.asp)

This selects rows that have matching values in _both_ tables being selected from. For example if we wanted to select all the users who have blogposts, and show their usernames _and_ their blog posts' text content:

```sql
SELECT users.username, blog_posts.text_content
  FROM users INNER JOIN blog_posts
    ON users.id = blog_posts.user_id;
```

![Venn diagram of an inner join—only the overlap of two circles is highlighted](diagrams/inner-join.png)

| username  | text_content                                                        |
| --------- | ------------------------------------------------------------------- |
| Sery1976  | Announcing of invitation principles in.                             |
| Notne1991 | Peculiar trifling absolute and wandered vicinity property yet. son. |
| Moull1990 | Far stairs now coming bed oppose hunted become his.                 |

`INNER JOIN` returns only the the users that have blog posts.

### [`LEFT JOIN`](https://www.w3schools.com/sql/sql_join_left.asp)

This selects every entry in the first table, but only matched records from the second. For example if we wanted a list of _every_ user, plus their blog posts' text content (if they have any):

![Venn diagram of a left join—the left circle and overlap with the right circle is highlighted](diagrams/left-join.png)

```sql
SELECT users.username, blog_posts.text_content
  FROM users LEFT JOIN blog_posts
    ON users.id = blog_posts.user_id;
```

| username  | text_content                                                       |
| --------- | ------------------------------------------------------------------ |
| Sery1976  | Announcing of invitation principles in.                            |
| Notne1991 | Peculiar trifling absolute and wandered vicinity property yet.son. |
| Moull1990 | Far stairs now coming bed oppose hunted become his.                |
| Spont1935 |                                                                    |

`LEFT JOIN` selects one extra row here compared to `INNER JOIN`: the final user "Spont1935" who has no blog posts.

### [`RIGHT JOIN`](https://www.w3schools.com/sql/sql_join_right.asp)

![Venn diagram of a left join—the right circle and overlap with the left circle is highlighted](diagrams/right-join.png)

This is similar to `LEFT JOIN`, but returns every entry in the second table, and only matching entries in the first. With our blog post data the result would be the same as an `INNER JOIN`, since every post must have an author.

### Combining tables challenges

1. #### Selecting users and comments

   Using [`LEFT JOIN`](https://www.w3schools.com/sql/sql_join_left.asp) select **every** user's location, plus the content of any comments they've made.

   ##### Expected Result

   | location       | text_content     |
   | -------------- | ---------------- |
   | Middlehill, UK |                  |
   | Sunipol, UK    | Great blog post! |
   | Wanlip, UK     |                  |
   | Saxilby, UK    |                  |

   <details>
   <summary>Solution</summary>

   ```sql
   SELECT users.location, post_comments.text_content
     FROM users
     LEFT JOIN post_comments ON users.id = post_comments.user_id;
   ```

   </details>

1. #### Selecting blog posts and comments

   Using [`INNER JOIN`](https://www.w3schools.com/sql/sql_join_inner.asp) select only blog posts with comments, returning the text_content of the blog posts and the text_content of the comments.

   ##### Expected Result

   | text_content                                        | text_content     |
   | --------------------------------------------------- | ---------------- |
   | Far stairs now coming bed oppose hunted become his. | Great blog post! |

   <details>
   <summary>Solution</summary>

   ```sql
   SELECT blog_posts.text_content, post_comments.text_content
     FROM blog_posts
     INNER JOIN post_comments ON blog_posts.id = post_comments.post_id;
   ```

   </details>

1. #### Bonus: select the user who made a comment

   Expand your previous solution to also include the username of the user who made each comment.

   ##### Expected Result

   | text_content                                        | text_content     | username  |
   | --------------------------------------------------- | ---------------- | --------- |
   | Far stairs now coming bed oppose hunted become his. | Great blog post! | Notne1991 |

   **Hint**: you can use more than one join.

   <details>
   <summary>Solution</summary>

   ```sql
   SELECT blog_posts.text_content, post_comments.text_content, users.username
     FROM blog_posts
     INNER JOIN post_comments ON blog_posts.id = post_comments.post_id
     INNER JOIN users ON users.id = post_comments.user_id;
   ```

   </details>

## Bonus: Sub queries

You can nest SQL expressions. For example:

```sql
SELECT * FROM dogs WHERE owner = (SELECT name FROM humans WHERE id = 1)
```

is the equivalent of:

```sql
SELECT * FROM dogs WHERE owner = 'oli';
```

if there's a human with ID 1 and name 'oli'.

### Add a comment to a post

Add a new comment to the `post_comments` table. It should have a user ID of `3` and text content `'Interesting post'`. The comment should be linked to whichever post has text content of `'Peculiar trifling absolute and wandered vicinity property yet.'` (i.e. its `post_id` should be the ID of that post).

You can then run `SELECT text_content FROM post_comments WHERE post_id = 2;` to test for the expected result.

#### Expected Result

| text_content     |
| ---------------- |
| Interesting post |

<details>
  <summary>Solution</summary>

```sql
INSERT INTO post_comments (post_id, reply_to, user_id, text_content)
  VALUES (
    (
      SELECT id FROM blog_posts
        WHERE text_content = 'Peculiar trifling absolute and wandered vicinity property yet.'
    ),
    3,
    'Interesting post'
  )
;
```

</details>
