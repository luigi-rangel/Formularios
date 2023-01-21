const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError, PrismaClientValidationError } = require('@prisma/client/runtime');

require('dotenv').config();

const prisma = new PrismaClient();

const createUser = async user => {
    return await prisma.user.create({
        data: user
    }).then(() => {
        prisma.$disconnect();
        return {
            status: "ok", 
            message: "User created"
        };
    }).catch(e => {
        prisma.$disconnect;

        if(e instanceof PrismaClientKnownRequestError && e.code == 'P2002'){
            return {
                status: "error",
                message: "Username taken"
            }
        }
        return {
            status: "error", 
            message: e.message
        };
    });
}

const getUser = async data => {
    const answer = await prisma.user.findMany({
        where: {
            email: data.email
        }
    }).then(res => {
        prisma.$disconnect();
        return res;
    }).catch(e => {
        prisma.$disconnect;
        
        return {
            status: "error",
            message: e.message
        };
    });

    if(answer.hasOwnProperty('status')){
        return answer;
    }
    
    return {
        status: "ok",
        data: answer
    };
}

const getAdmin = async () => {
    return await prisma.user.findUnique({
        where: {
            userid: process.env.ADMIN_ID
        }
    }).then(res => {
        prisma.$disconnect();
        return {
            status: "ok", 
            data: [res]
        };
    }).catch(e => {
        prisma.$disconnect;
        return {
            status: "error", 
            message: e.message
        };
    });
}

module.exports = {
    createUser,
    getUser,
    getAdmin
}