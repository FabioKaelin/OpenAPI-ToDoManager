  DROP TABLE IF EXISTS "users";
  CREATE TABLE "public"."users" (
      "id" uuid DEFAULT gen_random_uuid() NOT NULL,
      "email" character varying(50) NOT NULL,
      "password" character(60) NOT NULL,
      "created" timestamp DEFAULT now() NOT NULL
  ) WITH (oids = false);

  COMMENT ON COLUMN "public"."users"."password" IS 'Hashed password. I prefer the blowfish algorithm (bf)';

  INSERT INTO "users" ("id", "email", "password", "created") VALUES (
    '97c19aab-353f-4a99-a354-6cc451a6d48a',
    'hugo@m295.local.zli.ch',
    '$2a$06$Z.x5E4k0wMkKjCnT2xk1O.JXt2J180GJog3tmzqtRrNJN9srNhl4G',
    '2021-11-25 07:51:11.048941');
