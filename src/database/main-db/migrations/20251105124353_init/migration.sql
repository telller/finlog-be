-- CreateTable
CREATE TABLE "tag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
    "updatedBy" UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
    "order" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_id_key" ON "tag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");
