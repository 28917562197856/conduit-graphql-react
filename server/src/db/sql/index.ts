import { QueryFile, IQueryFileOptions } from "pg-promise";
import path from "path";

export let users = {
  create: sql("./users/create.sql"),
  add: sql("./users/add.sql"),
  find: sql("./users/find.sql")
};

export let articles = {
  create: sql("./articles/create.sql"),
  add: sql("./articles/add.sql"),
  find: sql("./articles/find.sql"),
  delete: sql("./articles/delete.sql")
};

export let comments = {
  create: sql("./comments/create.sql"),
  add: sql("./comments/add.sql"),
  findAll: sql("./comments/findAll.sql"),
  delete: sql("./comments/delete.sql")
};

export let favorites = {
  create: sql("./favorites/create.sql"),
  add: sql("./favorites/add.sql"),
  delete: sql("./favorites/delete.sql")
};
export let follows = {
  create: sql("./follows/create.sql"),
  add: sql("./follows/add.sql")
};

function sql(file: string): QueryFile {
  const fullPath: string = path.join(__dirname, file); // generating full path;

  const options: IQueryFileOptions = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true

    // See also property 'params' for two-step template formatting
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
