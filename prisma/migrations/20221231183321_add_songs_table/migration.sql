-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "midiFilePath" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
