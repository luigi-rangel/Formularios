const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createForm = async form => {
    return await prisma.form.create({
        data: form
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

module.exports = {
    createForm
}