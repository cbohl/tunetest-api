-- CreateTable
CREATE TABLE "ScoreRecord" (
    "id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "ScoreRecord_pkey" PRIMARY KEY ("id")
);
