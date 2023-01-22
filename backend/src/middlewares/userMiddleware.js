require('dotenv').config();

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

    if(!headers.hash) return res.status(401).json({status: "error", message: "Missing authentication"});

    const userid = req.body.userid || req.body[0]?.userid;
    const { data } = await getUserById(userid);

    if(!data || !await utils.validateHash(data.password, data.lastAccess, headers.hash)) {
        return res.status(401).json({status: "error", message: "User unauthorized"});
    }

    next();
}

const validateUserOrAdmin = async (req, res, next) => {
    const { headers } = req;
    const userid = req.query.userid;

    if(!headers.hash) return res.status(401).json({status: "error", message: "Missing authentication"});
    if(!userid) return res.status(404).json({status: "error", message: "Missing query userid"});

    const { data: uData } = await getUserById(userid);
    const { data: aData } = await getUserById(process.env.ADMIN_ID);

    if(!(await utils.validateHash(uData.password, uData.lastAccess, headers.hash) || 
        await utils.validateHash(aData.password, aData.lastAccess, headers.hash))){
            return res.status(401).json({status: "error", message: "User unauthorized"});
    }

    next();
}

module.exports = {
    validateBody,
    validateUser,
    validateUserOrAdmin
}