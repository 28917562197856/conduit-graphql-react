import pgPromise from "pg-promise";
import { articles, comments, favorites, follows, users } from "./sql";

let sql = {
  articles,
  comments,
  favorites,
  follows,
  users
};

let pgp = pgPromise();

let dbConfig = {
  host: "localhost",
  port: 5432,
  database: "conduit",
  user: "postgres"
};

let db = pgp(dbConfig);

export { pgp, db, sql };
