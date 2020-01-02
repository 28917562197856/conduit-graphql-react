CREATE TABLE comments (
  id serial PRIMARY KEY,
  createdAt date NOT NULL,
  updatedAt date NOT NULL,
  body text NOT NULL,
  author_id int REFERENCES users(id),
  article_id int REFERENCES articles(id)
)