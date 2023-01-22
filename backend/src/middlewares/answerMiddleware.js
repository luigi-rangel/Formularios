const utils = require('./utils');

const validateBody = (req, res, next) => {
    const fields = ['userid', 'questionid', 'text'];
    const types = ['string', 'string', 'string'];

    let valid = true;

    req.body.forEach(e => {
        const { valid: partial } = utils.validateFields(fields, e);
        valid &&= partial;
    })

    if(!valid){
        return res.status(400).json({status: "error", message: "One or more answer fields are missing"});
    }

    const userid = req.body
    .map(e => e.userid)
    .reduce((acc, cur) => {
        return acc == cur ? acc : null
    });

    if(!userid) return res.status(404).json({status: "error", message: "All answers are expected to have the same userid"});

    next();
}

const validateQuery = (req, res, next) => {
    const fields = ['questionid', 'userid'];

    const { valid, message } = utils.validateFields(fields, req.query);

    if(!valid){
        return res.status(400).json({status: "error", message: message})
    }

    next()
}

module.exports = {
    validateBody,
    validateQuery
}