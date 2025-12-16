import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
    migrations: { path: 'src/database/main-db/migrations' },
    datasource: { url: env('PG_DATABASE_URL') },
    schema: 'src/database/main-db/schema.prisma',
});
