import pgPromise from "pg-promise";

export let pgp = pgPromise();

let dbConfig = {
  host: "localhost",
  port: 5432,
  database: "conduit",
  user: "postgres"
};

export let db = pgp(dbConfig);
