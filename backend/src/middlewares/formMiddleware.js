const { getAdmin } = require('../models/.userModel');
const utils = require('./utils');

const validateBody = (req, res, next) => {
    const fields = ['name'];

    const { valid, message } = utils.validateFields(fields, req.body);

    if(!valid){
        return res.status(400).json({status: "error", message: message});
    }

    next();
}

const validateAdmin = async (req, res, next) => {
    const { headers } = req;
    const { data } = await getAdmin();

    if(!await utils.validateUser(`${data[0].userid}${data[0].lastAccess}`, headers.hash)) {
        return res.status(401).json({status: "error", message: "User unauthorized"});
    }

    next();
}

module.exports = {
    validateBody,
    validateAdmin
}