INSERT INTO users(username, email, bio)
VALUES($1, $2, $3) RETURNING *