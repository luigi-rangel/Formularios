-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DISCURSIVE', 'OBJECTIVE', 'CHECKBOX');

-- CreateTable
CREATE TABLE "User" (
    "userid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Answer" (
    "userid" TEXT NOT NULL,
    "questionid" TEXT NOT NULL,
    "text" TEXT,
    "grade" DOUBLE PRECISION,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("userid","questionid")
);

-- CreateTable
CREATE TABLE "Question" (
    "questionid" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "options" TEXT[],
    "formid" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionid")
);

-- CreateTable
CREATE TABLE "Form" (
    "formid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "open" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("formid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "Question"("questionid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formid_fkey" FOREIGN KEY ("formid") REFERENCES "Form"("formid") ON DELETE RESTRICT ON UPDATE CASCADE;
