INSERT INTO comments(
    "createdAt",
    body,
    "authorId",
    "articleId"
  )
VALUES($1, $2, $3, $4) RETURNING *