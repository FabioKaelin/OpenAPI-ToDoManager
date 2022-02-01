const { APIResponse } = require('../utils/response');
const db = require('../utils/db.js');
const logger = require('../utils/logger');
// const db = require('../utils/db.js');

function register(req, res) {
  // db.any(`CREATE EXTENSION pgcrypto;`);
  // db.any(`CREATE OR REPLACE FUNCTION trigger_set_timestamp()`);
  // db.any(`DROP TABLE IF EXISTS "tasks";`);
  // db.any(
  //   `CREATE TABLE "public"."tasks" ("id" uuid DEFAULT gen_random_uuid() NOT NULL,"owner" uuid NOT NULL,"description" text NOT NULL,"created" timestamp DEFAULT now() NOT NULL,"updated" timestamp DEFAULT now() NOT NULL,CONSTRAINT "TaskID" PRIMARY KEY ("id")) WITH (oids = false);`,
  // );
  // db.any(`CREATE INDEX "TaskOwner" ON "public"."tasks" USING btree ("owner");`);
  // db.any(
  //   `CREATE TRIGGER "set_timestamp" BEFORE UPDATE ON "public"."tasks" FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();;`,
  // );
  // db.any(`DROP TABLE IF EXISTS "users";`);
  // db.any(
  //   `CREATE TABLE "public"."users" ("id" uuid DEFAULT gen_random_uuid() NOT NULL,"email" character varying(50) NOT NULL,"password" character(60) NOT NULL,"created" timestamp DEFAULT now() NOT NULL,CONSTRAINT "users_id" PRIMARY KEY ("id")) WITH (oids = false);`,
  // );
  // db.any(
  //   `COMMENT ON COLUMN "public"."users"."password" IS 'Hashed password. I prefer the blowfish algorithm (bf)';`,
  // );
  // db.any(
  //   `INSERT INTO "users" ("id", "email", "password", "created") VALUES ('d5e30d8f-a59d-45f3-b9ea-01e742163ff5',	'hugo@m295.local.zli.ch',	'$2a$06$Z.x5E4k0wMkKjCnT2xk1O.JXt2J180GJog3tmzqtRrNJN9srNhl4G',	'2021-11-25 07:51:11.048941');`,
  // );
  // db.any(
  //   `ALTER TABLE ONLY "public"."tasks" ADD CONSTRAINT "tasks_owner_fkey" FOREIGN KEY (owner) REFERENCES users(id) NOT DEFERRABLE;`,
  // );

  // let data = {
  //   id: 'id',
  //   email: 'email',
  // };
  // const USER = new APIResponse(200, 'A new User', data);
  // res.status(USER.code).json(USER);
  let data = {};
  // console.log(req);
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  db.users.unique(email).then((response) => {
    console.log(response);
    if (response === undefined) {
      console.log('if');
      let data = {};
      const uuid = new APIResponse(400, 'Unexpected Error', data);
      res.status(uuid.code).json(uuid);
    } else if (response === null) {
      console.log('else if');
      db.users.idclean().then(function (data) {
        console.log(data);
        let id = data.uuid;
        db.users.hash(password).then(function (data) {
          let pwhash = data.hash;
          db.users.add(id, email, pwhash).then(function (data) {
            data = {
              id: id,
              email: email,
            };
            const USER = new APIResponse(200, 'A new User', data);
            res.status(USER.code).json(USER);
          });
        });
      });
    } else {
      console.log('else');
      let data = {};
      const uuid = new APIResponse(400, 'Unexpected Error', data);
      res.status(uuid.code).json(uuid);
    }
  });

  // db.users.verify(req.body.email, req.body.password).then((response) => {
  //   console.log(response);
  // });

  // db.one("SELECT replace(gen_random_uuid()::text, '-','') AS UUID;")
  //   .then(function (data) {
  //     data = {
  //       UUID: data.uuid,
  //     };

  //     const uuid = new APIResponse(200, 'A random UUID', data);
  //     res.status(uuid.code).json(uuid);
  //   })
  //   .catch(function (error) {
  //     logger.error(error);
  //     let data = {};
  //     const uuid = new APIResponse(400, 'Unexpected Error', data);
  //     res.status(uuid.code).json(uuid);
  //   });
}
module.exports = {
  register,
};
