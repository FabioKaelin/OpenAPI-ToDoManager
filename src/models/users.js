const logger = require('../utils/logger');
// When exporting classes in node you need to define the class first,
// then export the class using module.exports followed
// by the name of the class you wish to export.

class Users {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  id() {
    // return this.db.one("SELECT replace(gen_random_uuid()::text, '-', '') AS UUID;");
    return this.db.one('SELECT gen_random_uuid() AS id;');
  }

  idclean() {
    // return this.db.one("SELECT replace(gen_random_uuid()::text, '-', '') AS UUID;");
    return this.db.one(
      "SELECT replace(gen_random_uuid()::text, '-','') AS UUID;",
    );
  }

  hash(password) {
    return this.db.one("SELECT crypt($1, gen_salt('bf')) AS hash;", password);
  }

  add(uuid, email, hash) {
    return this.db.one(
      'INSERT INTO users(id, email, password) VALUES($1, $2, $3) RETURNING id',
      [uuid, email, hash],
      (a) => a.id,
    );
  }

  remove(id) {
    return this.db.none('DELETE FROM users WHERE id = $1', id);
  }

  get(id) {
    return this.db.oneOrNone('SELECT id, email FROM users WHERE id = $1;', id);
  }

  verify(email, password) {
    // It resolves with the row-object when 1 row is returned, or with null when nothing is returned.
    return this.db.oneOrNone(
      'SELECT id, email FROM users WHERE email = $1 AND password = crypt($2, password);',
      [email, password],
    );
  }

  getId(email) {
    return this.db.oneOrNone(
      'SELECT id, email FROM users WHERE email = $1;',
      email,
    );
  }

  unique(email) {
    return this.db.oneOrNone(
      'SELECT email FROM users WHERE email = $1;',
      email,
    );
  }
}

module.exports = Users;
