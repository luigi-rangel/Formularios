const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createQuestion = async question => {
    return await prisma.question.create({
        data: question
    }).then(() => {
        prisma.$disconnect();
        return {
            status: "ok",
            message: "Question Created"
        };
    })
    .catch(e => {
        prisma.$disconnect();
        return {
            status: "error",
            message: e.message
        };
    });
}

module.exports = {
    createQuestion
}