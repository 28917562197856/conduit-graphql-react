INSERT INTO comments(
    createdAt,
    updatedAt,
    body,
    author_id,
    article_id
  )
VALUES($1, $2, $3, $4, $5) RETURNING *