CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL,
  email text NOT NULL,
  bio text NOT NULL,
)