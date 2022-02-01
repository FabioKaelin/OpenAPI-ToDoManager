const logger = require('../utils/logger');

/**
 * Note: The created timestamp is tracked with the default value of NOW()
 * Note: The updated timestamp is tracked with a trigger
 * See: [Triggers to automatically update timestamps](https://x-team.com/blog/automatic-timestamps-with-postgresql/)
 *      [postgreSQL Trigger Functions](https://www.postgresql.org/docs/current/plpgsql-trigger.html)
 **/

class Tasks {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  id() {
    //return this.db.one("SELECT replace(gen_random_uuid()::text, '-', '') AS ID;",);
    return this.db.one('SELECT gen_random_uuid() AS ID;');
  }

  add(id, owner, description) {
    return this.db.one(
      'INSERT INTO tasks(id, owner, description) VALUES($1, $2, $3) RETURNING id',
      [id, owner, description],
      (a) => a.id,
    );
  }

  update(id, owner, description) {
    console.log('update tasks models');
    return this.db.none(
      'UPDATE tasks SET description = $1 WHERE id = $2 AND owner = $3;',
      [description, id, owner],
    );
  }

  get(id, owner) {
    return this.db.one(
      'SELECT id, owner, description FROM tasks WHERE id = $1 AND owner = $2;',
      [id, owner],
    );
  }

  // When no rows are returned, it resolves with an empty array.
  // When 1 or more rows are returned, it resolves with the array of rows.
  fetch(owner) {
    console.log('fetch model tasks');
    return this.db.any(
      'SELECT id, description, updated FROM tasks WHERE owner = $1;',
      [owner],
    );
  }

  remove(id, owner) {
    return this.db.none('DELETE FROM tasks WHERE id = $1 AND owner = $2;', [
      id,
      owner,
    ]);
  }
}

module.exports = Tasks;
