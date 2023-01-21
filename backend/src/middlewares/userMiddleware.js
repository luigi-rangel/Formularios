const utils = require('./utils');

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

module.exports = {
    validateBody
}