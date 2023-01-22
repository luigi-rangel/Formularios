const model = require('../models/_formModel');

const createForm = async (req, res) => {
    const answer = await model.createForm(req.body);
    if(answer.status == "ok") return res.status(201).json(answer);
    return res.status(500).json(answer);
}

const getAllForms = async (_req, res) => {
    const answer = await model.getAllForms();
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const getFormById = async (req, res) => {
    const answer = await model.getFormById(req.query.formid, req.query.userid);
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const getAllFormAnswers = async (req, res) => {
    const answer = await model.getAllFormAnswers(req.params.id);
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const updateForm = async (req, res) => {
    const answer = await model.updateForm(req.body);
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const deleteForm = async (req, res) => {
    const answer = await model.deleteForm(req.params.id);
    if(answer.status == "ok") return res.status(200).json(answer);
    if(answer.message == "Form not found") return res.status(404).json(answer);
    return res.status(500).json(answer);
}

module.exports = {
    createForm,
    getAllForms,
    getFormById,
    getAllFormAnswers,
    updateForm,
    deleteForm
}