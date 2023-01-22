const model = require('../models/_answerModel');

const createAnswer = async (req, res) => {
    const answer = await model.createAnswer(req.body);
    if(answer.status == "ok") return res.status(201).json(answer);
    if(answer.message == "Answer already registered") return res.status(403).json(answer);
    return res.status(500).json(answer);
}

const updateAnswer = async (req, res) => {
    const answer = await model.updateAnswer(req.body);
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const deleteFormAnswers = async (req, res) => {
    const answer = await model.deleteFormAnswers(req.query.formid, req.query.userid);
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

module.exports = {
    createAnswer,
    updateAnswer,
    deleteFormAnswers
}