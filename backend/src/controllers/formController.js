const model = require('../models/.formModel');

const createForm = async (req, res) => {
    const answer = await model.createForm(req.body);
    return res.status(201).json(answer);
}

module.exports = {
    createForm
}