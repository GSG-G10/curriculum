BEGIN;

DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  location TEXT NOT NULL
);

INSERT INTO users (name, location) VALUES
  ('Ali', 'Gaza'),
  ('Mo', 'Canada'),
  ('John', 'USA');

COMMIT;
