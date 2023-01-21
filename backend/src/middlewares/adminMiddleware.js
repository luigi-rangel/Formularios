const { getAdmin } = require('../models/_userModel');
const utils = require('./utils');

const validateAdmin = async (req, res, next) => {
    const { headers } = req;
    const { data } = await getAdmin();

    if(!await utils.validateUser(`${data[0].password}${data[0].lastAccess}`, headers.hash)) {
        return res.status(401).json({status: "error", message: "User unauthorized"});
    }

    next();
}

module.exports = {
    validateAdmin
}