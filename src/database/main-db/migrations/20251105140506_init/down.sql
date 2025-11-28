-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_tagId_fkey";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "expenses";

-- DropTable
DROP TABLE "tag";

