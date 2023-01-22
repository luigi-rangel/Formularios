const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');

const prisma = new PrismaClient();

const createUser = async user => {
    return await prisma.user.create({
        data: user
    }).then(() => {
        return {
            status: "ok", 
            message: "User created"
        };
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == 'P2002'){
            return {
                status: "error",
                message: "Email taken"
            }
        }
        return {
            status: "error", 
            message: e.message
        };
    });
}

const getUser = async data => {
    return await prisma.user.findUnique({
        where: {
            email: data.email
        }
    }).then(async res => {
        if(!res) return {
            status: "ok",
            data: res
        }
        
        res.lastAccess = new Date();

        await prisma.user.update({
            where: {
                email: data.email
            },
            data: {
                lastAccess: res.lastAccess
            }
        });

        return {
            status: "ok",
            data: res
        };
    }).catch(e => {
        return {
            status: "error",
            message: e.message
        };
    });
}

const getUserById = async id => {
    return await prisma.user.findUnique({
        where: {
            userid: id
        }
    }).then(res => {
        return {
            status: "ok", 
            data: res
        };
    }).catch(e => {
        return {
            status: "error", 
            message: e.message
        };
    });
}

const updateUser = async data => {
    return await prisma.user.update({
        where: {
            email: data.email
        },
        data: {...data, lastAccess: new Date()}
    }).then(res => {
        return {
            status: "ok",
            data: [res]
        };
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == "P2002") return {
            status: "error",
            message: "Email taken"
        };
        return {
            status: "error",
            message: e.message
        }
    })
}

const deleteUser = async email => {
    return await prisma.user.delete({
        where: {
            email: email
        }
    }).then(() => {
        return {
            status: "ok",
            message: "User deleted"
        }
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == "P2025"){
            return {
                status: "error",
                message: "User not found"
            }
        }
        return {
            status: "error",
            message: e.message
        }
    });
}

const logout = async userid => {
    return await prisma.user.update({
        where: {
            userid: userid
        },
        data: {
            lastAccess: null
        }
    }).then(() => {
        return {
            status: "ok",
            message: "User logged out"
        }
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == "P2025"){
            return {
                status: "error",
                message: "User not found"
            }
        }
        return {
            status: "error",
            message: e.message
        }
    })
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    logout
}