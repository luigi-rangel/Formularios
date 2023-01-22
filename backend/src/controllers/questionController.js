const model = require('../models/_questionModel');

const createQuestion = async (req, res) => {
    const answer = await model.createQuestion(req.body);
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const updateQuestion = async (req, res) => {
    const answer = await model.updateQuestion(req.body);
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const deleteQuestion = async (req, res) => {
    const answer = await model.deleteQuestion(req.params.id);
    if(answer.status == "ok") return res.status(200).json(answer);
    if(answer.message == "Question not found") return res.status(404).json(answer);
    return res.status(500).json(answer);
}

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion
}