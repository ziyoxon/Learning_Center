-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lesson_start_time" TIMESTAMP(3) NOT NULL,
    "lesson_end_time" TIMESTAMP(3) NOT NULL,
    "lesson_week_day" TEXT NOT NULL,
    "room_number" INTEGER NOT NULL,
    "room_floor" INTEGER NOT NULL,
    "lesson_quant" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);
