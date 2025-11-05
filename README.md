
# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# watch mode docker
$ docker compose up --build -d

# production mode
$ npm run start:prod
```

## Apply Prisma Migrations & Update Schema

```bash
$ npm run prisma-migrate && npm run db-schema
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Create Prisma Schema rollbacks migration
1. Make changes you need to Models or create a new one in `schema.prisma` file
2. Run `npx prisma migrate diff --from-schema-datamodel src/database/main-db/schema.prisma --to-schema-datasource src/database/main-db/schema.prisma --script > down.sql`
3. Create new migration using guide below
4. Copy your down.sql file into the new directory along with the up migration file

## Create Prisma Schema Migrations
1. Make changes you need to Models or create a new one in `schema.prisma` file
2. Create migration file `npx prisma migrate dev --name <migration name> --create-only --schema src/database/main-db/schema.prisma`
3. Review and edit your newly created migrations.sql file in migrations folder
4. Execute `npx prisma migrate deploy --schema src/database/main-db/schema.prisma` to apply migration to your local db
5. !!! If migration fails use `npx prisma migrate resolve --rolled-back <your migration name> --schema src/database/main-db/schema.prisma` to revert it
----
To mark migrations as applied use the following example command:
`npx prisma migrate resolve --applied 1_base-seed --schema src/database/main-db/schema.prisma`
