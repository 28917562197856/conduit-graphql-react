import { articles as sql } from "../sql";
import { db, pgp } from "..";

async function add(article: object) {
  return db.one(sql.add, Object.values(article));
}

async function find(slug: string) {
  return db.one(sql.find, slug);
}

async function update(slug: string, vars: object) {
  let update = pgp.helpers.update(vars, undefined, "articles");
  update += ` WHERE slug='${slug}' RETURNING *`;
  console.log(update);
  return db.one(update);
}

async function remove(slug: string) {
  return db.one(sql.delete, slug);
}

export let articles = {
  add,
  find,
  update,
  remove
};
