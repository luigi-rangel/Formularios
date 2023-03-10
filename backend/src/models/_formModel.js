const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
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

const getForms = async (invisible = false) => {
    return await prisma.form.findMany({
        where: {
            OR: [
                {visible: true},
                {visible: !invisible}
            ]
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

const getFormAnswersById = async (formid, userid) => {
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
        console.log(e.message);
        return {
            status: "error",
            message: e.message
        }
    });
}

const updateForm = async data => {
    return await prisma.form.update({
        where: {
            formid: data.formid
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
    })
}

const deleteForm = async id => {
    return await prisma.form.delete({
        where: {
            formid: id
        }
    }).then(() => {
        return {
            status: "ok",
            message: "Form deleted"
        };
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == "P2025"){
            return {
                status: "error",
                message: "Form not found"
            }
        }
        return {
            status: "error",
            message: e.message
        };
    });
}

const updateVisibility = async (formid, visibility) => {
    return await prisma.form.update({
        where: {
            formid: formid
        },
        data: {
            visible: visibility
        }
    }).then(res => {
        console.log(res)
        return {
            status: "ok",
            message: "Visbility altered"
        }
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == "P2025"){
            return {
                status: "error",
                message: "Form not found"
            }
        }
        return {
            status: "error",
            message: e.message
        };
    })
}

const updateState = async (formid, state) => {
    return await prisma.form.update({
        where: {
            formid: formid
        },
        data: {
            open: state
        }
    }).then(() => {
        return {
            status: "ok",
            message: "State altered"
        }
    }).catch(e => {
        if(e instanceof PrismaClientKnownRequestError && e.code == "P2025"){
            return {
                status: "error",
                message: "Form not found"
            }
        }
        return {
            status: "error",
            message: e.message
        };
    })
}

module.exports = {
    createForm,
    getForms,
    getFormAnswersById,
    getAllFormAnswers,
    updateForm,
    deleteForm,
    updateVisibility,
    updateState
}