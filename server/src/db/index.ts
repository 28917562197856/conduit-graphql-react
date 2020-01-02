import pgPromise from "pg-promise";
import { users, articles, comments, favorites, follows } from "./sql";

let pgp = pgPromise();

let dbConfig = {
  host: "localhost",
  port: 5432,
  database: "conduit",
  user: "postgres"
};

let db = pgp(dbConfig);

export { pgp, db, users, articles, comments, favorites, follows };
