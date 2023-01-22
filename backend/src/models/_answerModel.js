const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

const createAnswers = async (answers) => {
    return await prisma.answer.createMany({
        data: answers
    }).then(() => {
        prisma.$disconnect();
        return {
            status: "ok",
            message: "Answers Created"
        };
    })
    .catch(e => {
        prisma.$disconnect();

        if(e instanceof PrismaClientKnownRequestError && e.code == 'P2002'){
            return {
                status: "error",
                message: "Answers already registered"
            }
        }
        console.log(e)
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
        if(e instanceof PrismaClientKnownRequestError && e.code == 'P2025'){
            return {
                status: "error",
                message: "Answer not found"
            }
        }

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
        if(e instanceof PrismaClientKnownRequestError && e.code == 'P2025'){
            return {
                status: "error",
                message: "Answers not found"
            }
        }

        return {
            status: "error",
            message: e.message
        }
    })
}

const updateGrade = async (questionid, userid, grade) => {
    return await prisma.answer.update({
        where: {
            id: {
                questionid: questionid,
                userid: userid
            }
        },
        data: {
            grade: grade
        }
    }).then(() => {
        return {
            status: "ok",
            message: "Grade updated"
        }
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == 'P2025'){
            return {
                status: "error",
                message: "Answer not found"
            }
        }

        return {
            status: "error",
            message: e.code
        }
    });
}

module.exports = {
    createAnswers,
    updateAnswer,
    deleteFormAnswers,
    updateGrade
};