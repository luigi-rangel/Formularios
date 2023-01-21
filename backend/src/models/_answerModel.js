const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

const createAnswer = async answer => {
    return await prisma.answer.create({
        data: answer
    }).then(() => {
        prisma.$disconnect();
        return {
            status: "ok",
            message: "Answer Created"
        };
    })
    .catch(e => {
        prisma.$disconnect();

        if(e instanceof PrismaClientKnownRequestError && e.code == 'P2002'){
            return {
                status: "error",
                message: "Answer already registered"
            }
        }

        return {
            status: "error",
            message: e.message
        };
    });
}

module.exports = {
    createAnswer
}