const model = require('../models/_formModel');

const createForm = async (req, res) => {
    const answer = await model.createForm(req.body);
    if(answer.status == "ok") return res.status(201).json(answer);
    return res.status(500).json(answer);
}

const getAllForms = async (_req, res) => {
    const answer = await model.getForms(true);
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const getVisibleForms = async (_req, res) => {
    const answer = await model.getForms();
    if(answer.status == "ok") return res.status(200).json(answer);
    return res.status(500).json(answer);
}

const getFormAnswersById = async (req, res) => {
    const answer = await model.getFormAnswersById(req.query.formid, req.query.userid);
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

const updateVisibility = async (req, res) => {
    const answer = await model.updateVisibility(req.query.formid, !!req.params.visibility);
    if(answer.status == "ok") return res.status(200).json(answer);
    if(answer.message == "Form not found") return res.status(404).json(answer);
    return res.status(500).json(answer);
}

const updateState = async (req, res) => {
    const answer = await model.updateState(req.query.formid, !!req.params.state);
    if(answer.status == "ok") return res.status(200).json(answer);
    if(answer.message == "Form not found") return res.status(404).json(answer);
    return res.status(500).json(answer);
}

module.exports = {
    createForm,
    getAllForms,
    getVisibleForms,
    getFormAnswersById,
    getAllFormAnswers,
    updateForm,
    deleteForm,
    updateVisibility,
    updateState
}