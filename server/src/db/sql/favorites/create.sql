CREATE TABLE favorites (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id),
  article_id int REFERENCES articles(id)
)