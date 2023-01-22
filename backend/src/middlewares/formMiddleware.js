const utils = require('./utils');

const validateBody = (req, res, next) => {
    const fields = ['name'];
    const types = ['string'];

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

const validateQuery = (req, res, next) => {
    if(!req.query.formid) {
        return res.status(400).json({status: "error", message: "Missing query formid"});
    }

    next()
}

module.exports = {
    validateBody,
    validateQuery
}