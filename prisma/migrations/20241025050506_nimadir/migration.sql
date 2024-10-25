-- CreateTable
CREATE TABLE "staff_role" (
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "staff_role_pkey" PRIMARY KEY ("staffId")
);

-- AddForeignKey
ALTER TABLE "staff_role" ADD CONSTRAINT "staff_role_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
