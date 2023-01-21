const model = require('../models/_questionModel');

const createQuestion = async (req, res) => {
    const answer = await model.createQuestion(req.body);
    return res.status(201).json(answer);
}

module.exports = {
    createQuestion
}