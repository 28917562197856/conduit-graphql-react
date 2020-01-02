INSERT INTO users(username, email, bio, image)
VALUES($1, $2, $3, $4) RETURNING *