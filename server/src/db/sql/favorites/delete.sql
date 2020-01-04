DELETE FROM favorites
WHERE
  "userId" = $1
  AND "articleId" = $2