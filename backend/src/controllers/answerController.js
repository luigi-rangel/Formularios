const model = require('../models/_answerModel');

const createAnswers = async (req, res) => {
    const answer = await model.createAnswers(req.body);
    if(answer.status == "ok") return res.status(201).json(answer);
    if(answer.message == "Answers already registered") return res.status(403).json(answer);
    return res.status(500).json(answer);
}

const updateAnswer = async (req, res) => {
    const answer = await model.updateAnswer(req.body);
    if(answer.status == "ok") return res.status(200).json(answer);
    if(answer.message == "Answer not found") return res.status(404).json(answer);
    return res.status(500).json(answer);
}

const deleteFormAnswers = async (req, res) => {
    const answer = await model.deleteFormAnswers(req.query.formid, req.query.userid);
    if(answer.status == "ok") return res.status(200).json(answer);
    if(answer.message == "Answers not found") return res.status(404).json(answer);
    return res.status(500).json(answer);
}

const updateGrade = async (req, res) => {
    const answer = await model.updateGrade(req.query.questionid, req.query.userid, parseFloat(req.params.grade));
    if(answer.status == "ok") return res.status(200).json(answer);
    if(answer.message == "Answer not found") return res.status(404).json(answer);
    return res.status(500).json(answer);
}

module.exports = {
    createAnswers,
    updateAnswer,
    deleteFormAnswers,
    updateGrade
}