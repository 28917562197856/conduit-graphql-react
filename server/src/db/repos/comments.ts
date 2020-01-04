import { comments as sql } from "../sql";
import { db } from "..";

async function add(comment: object) {
  return db.one(sql.add, Object.values(comment));
}

async function findAll(id: number) {
  return db.any(sql.findAll, id);
}

async function remove(id: number) {
  return db.one(sql.delete, id);
}

export let comments = {
  add,
  findAll,
  remove
};
