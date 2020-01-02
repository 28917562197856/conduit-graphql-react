CREATE TABLE follows (
  id serial PRIMARY KEY,
  follower_id int REFERENCES users(id),
  followee_id int REFERENCES users(id)
)