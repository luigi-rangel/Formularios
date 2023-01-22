const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
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

const updateQuestion = async data => {
    return await prisma.question.update({
        where: {
            questionid: data.questionid
        },
        data: data
    }).then(res => {
        return {
            status: "ok",
            data: [res]
        };
    }).catch(e => {
        return {
            status: "error",
            message: e.message
        };
    });
}

const deleteQuestion = async id => {
    return await prisma.question.delete({
        where: {
            questionid: id
        }
    }).then(() => {
        return {
            status: "ok",
            message: "Question deleted"
        }
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == "P2025"){
            return {
                status: "error",
                message: "Question not found"
            }
        }
        return {
            status: "error",
            message: e.code
        }
    });
}

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion
}