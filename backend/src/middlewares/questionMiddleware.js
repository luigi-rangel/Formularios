const utils = require('./utils');

const Types = {
    DISCURSIVE: "DISCURSIVE",
    OBJECTIVE: "OBJECTIVE",
    CHECKBOX: "CHECKBOX"
}

const validateBody = (req, res, next) => {
    const fields = ['prompt', 'type', 'formid'];
    const types = ['string', 'string', 'string'];

    const { valid, message } = utils.validateFields(fields, req.body);

    if(!valid){
        return res.status(400).json({status: "error", message: message});
    }

    const { valid: validFieldTypes, message: messageFieldTypes } = utils.validateFieldTypes(fields, types, req.body);

    if(!validFieldTypes){
        return res.status(400).json({status: "error", message: messageFieldTypes});
    }

    if(!Object.keys(Types).includes(req.body.type)){
        return res.status(400).json({status: "error", message: `field 'type' expected to be either DISCURSIVE, OBJECTIVE or CHECKBOX`});
    }

    next();
}

module.exports = {
    validateBody
}