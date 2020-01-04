import { favorites as sql } from "../sql";
import { db } from "..";

async function add(favorite: object) {
  return db.none(sql.add, Object.values(favorite));
}

async function find(username: string) {
  return db.any("SELECT * FROM users WHERE username = $1", username);
}

async function remove(favorite: object) {
  return db.none(sql.delete, Object.values(favorite));
}

export let users = {
  add,
  find,
  remove
};
