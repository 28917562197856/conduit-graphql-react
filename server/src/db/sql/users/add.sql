INSERT INTO users(
    username,
    email,
    password,
    bio,
    image
  )
VALUES($1, $2, $3, $4, $5) RETURNING *