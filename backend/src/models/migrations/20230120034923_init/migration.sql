-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionid_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_userid_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_formid_fkey";

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "Question"("questionid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formid_fkey" FOREIGN KEY ("formid") REFERENCES "Form"("formid") ON DELETE CASCADE ON UPDATE CASCADE;
