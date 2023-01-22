const { getAllFormAnswers } = require('../models/_formModel');
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

const validateState = async (req, res, next) => {
    const { data } = await getAllFormAnswers(req.params.id);

    console.log(data[0])

    if(!data[0]?.open) return res.status(403).json({status: "error", message: "Form closed for new answers"});

    next();
}

module.exports = {
    validateBody,
    validateQuery,
    validateState
}