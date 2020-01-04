DELETE FROM articles
WHERE
  slug = $1 RETURNING *