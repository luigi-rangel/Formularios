const utils = require('./utils');

const validateBody = (req, res, next) => {
    const fields = ['userid', 'questionid', 'text'];
    const types = ['string', 'string', 'string'];

    const { valid, message } = utils.validateFields(fields, req.body);

    if(!valid){
        return res.status(400).json({status: "error", message: message});
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