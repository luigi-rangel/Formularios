const utils = require('./utils');
const { getUserById } = require('../models/_userModel');

const validateBody = (req, res, next) => {
    const fields = ['name', 'email', 'password'];
    const types = ['string', 'string', 'string'];
    
    const { valid: validFields, message: messageFields } = utils.validateFields(fields, req.body);

    
    if(!validFields){
        return res.status(400).json({message: messageFields});
    }
    
    const { valid: validFieldTypes, message: messageFieldTypes } = utils.validateFieldTypes(fields, types, req.body);

    if(!validFieldTypes){
        return res.status(400).json({message: messageFieldTypes});
    }

    next();
}

const validateUser = async (req, res, next) => {
    const { headers } = req;
    const { data } = await getUserById(req.body.userid);

    if(!headers.hash) return res.status(401).json({status: "error", message: "Missing authentication"});

    if(!await utils.validateHash(data.password, data.lastAccess, headers.hash)) {
        return res.status(401).json({status: "error", message: "User unauthorized"});
    }

    next();
}

module.exports = {
    validateBody,
    validateUser
}