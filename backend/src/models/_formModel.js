const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createForm = async form => {
    return await prisma.form.create({
        data: form,
        include: {
            questions: true
        }
    }).then(() => {
        prisma.$disconnect();
        return {
            status: "ok",
            message: "Form Created"
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

const getAllForms = async () => {
    return await prisma.form.findMany()
        .then(res => {
            prisma.$disconnect();
            return {
                status: "ok",
                data: res
            }
        }).catch(e => {
            prisma.$disconnect();
            return {
                status: "error",
                message: e.message
            }
        });
}

const getFormById = async (formid, userid) => {
    return await prisma.form.findMany({
        where: {
            formid: formid
        },
        include: {
            questions: {
                include: {
                    answers: {
                        where: {
                            userid: userid
                        }
                    }
                }
            }
        }
    }).then(res => {
        prisma.$disconnect();
        return {
            status: "ok",
            data: res
        }
    }).catch(e => {
        prisma.$disconnect();
        return {
            status: "error",
            message: e.message
        }
    });
}

const getAllFormAnswers = async id => {
    return await prisma.form.findMany({
        where: {
            formid: id
        },
        include: {
            questions: {
                include: {
                    answers: true
                }
            }
        }
    }).then(res => {
        prisma.$disconnect();
        return {
            status: "ok",
            data: res
        }
    }).catch(e => {
        prisma.$disconnect();
        return {
            status: "error",
            message: e.message
        }
    });
}

module.exports = {
    createForm,
    getAllForms,
    getFormById,
    getAllFormAnswers
}