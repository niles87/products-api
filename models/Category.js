const db = require("../config/connection");

class Category {
  getAll() {
    return db.query("select * from categories order by name");
  }

  getOne({ id }) {
    return db.query("select * from categories where id = $1", [id]);
  }

  create({ name, icon }) {
    return db.query(
      "insert into categories (name, icon) values ($1, $2) returning *",
      [name, icon]
    );
  }

  update({ name, icon, id }) {
    return db.query(
      "update categories set name = $1, icon = $2 where id = $3",
      [name, icon, id]
    );
  }

  delete({ id }) {
    return db.query("delete from categories where id = $1", [id]);
  }
}

module.exports = new Category();
