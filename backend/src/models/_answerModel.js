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

const updateAnswer = async data => {
    return await prisma.answer.update({
        where: {
            id: {
                questionid: data.questionid,
                userid: data.userid
            }
        },
        data: data
    }).then(res => {
        return {
            status: "ok",
            data: res
        }
    }).catch(e => {
        return {
            status: "error",
            message: e.message
        }
    });
}

const deleteFormAnswers = async (formid, userid) => {

    return await prisma.answer.deleteMany({
        where: {
            question: {
                form: {
                    formid: formid
                }
            },
            user: {
                userid: userid
            }
        }
    }).then(() => {
        return {
            status: "ok",
            message: "Answers deleted"
        };
    }).catch(e => {
        return {
            status: "error",
            message: e.message
        }
    })
}

module.exports = {
    createAnswer,
    updateAnswer,
    deleteFormAnswers
};