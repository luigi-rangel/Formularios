require('dotenv').config();

const { getUserById } = require('../models/_userModel');
const utils = require('./utils');

const validateAdmin = async (req, res, next) => {
    const { headers } = req;
    const { data } = await getUserById(process.env.ADMIN_ID);

    if(!headers.hash) return res.status(401).json({status: "error", message: "Missing authentication"});

    if(! await utils.validateHash(data.password, data.lastAccess, headers.hash)) {
        return res.status(401).json({status: "error", message: "User unauthorized"});
    }

    next();
}

module.exports = {
    validateAdmin
}