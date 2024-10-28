-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "lesson_date" TEXT NOT NULL,
    "lesson_time" TEXT NOT NULL,
    "lesson_theme" TEXT NOT NULL,
    "lesson_number" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);
