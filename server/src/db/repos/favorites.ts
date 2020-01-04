import { favorites as sql } from "../sql";
import { db } from "..";

async function add(favorite: object) {
  return db.none(sql.add, Object.values(favorite));
}

// async function findAll(id: number) {
//   return db.any(sql.findAll, id);
// }

async function remove(favorite: object) {
  return db.none(sql.delete, Object.values(favorite));
}

export let favorites = {
  add,
  remove
};
