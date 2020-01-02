INSERT INTO favorites(user_id, article_id)
VALUES($1, $2) RETURNING *