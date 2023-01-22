const express = require('express');
const router = express.Router();

const cors = require('cors');

router.use(cors());

const userController = require('./controllers/userController');
const formController = require('./controllers/formController');
const questionController = require('./controllers/questionController');
const answerController = require('./controllers/answerController');

const user = require('./middlewares/userMiddleware');
const form = require('./middlewares/formMiddleware');
const question = require('./middlewares/questionMiddleware');
const answer = require('./middlewares/answerMiddleware');
const admin = require('./middlewares/adminMiddleware');

router.post('/user', user.validateBody, userController.createUser);
router.post('/question', question.validateBody, admin.validateAdmin, questionController.createQuestion);
router.post('/form', form.validateBody, admin.validateAdmin, formController.createForm);
router.post('/answer', answer.validateBody, user.validateUser, answerController.createAnswer); //alterar para enviar todas as respostas de uma vez

router.get('/user', userController.getUser);
router.get('/forms', formController.getAllForms);
router.get('/form/', formController.getFormById);
router.get('/form/answers/:id', admin.validateAdmin, formController.getAllFormAnswers);

router.put('/user', admin.validateAdmin, userController.updateUser);
router.put('/question', admin.validateAdmin, questionController.updateQuestion);
router.put('/form', admin.validateAdmin, formController.updateForm);
router.put('/answer', user.validateUser, answerController.updateAnswer);

//delete
router.delete('/user/', admin.validateAdmin, userController.deleteUser);
router.delete('/question/:id', admin.validateAdmin, questionController.deleteQuestion);
router.delete('/form/:id', admin.validateAdmin, formController.deleteForm);
router.delete('/answers/form', admin.validateAdmin, answerController.deleteFormAnswers);

//patch
router.patch('/answer/:grade/grade', admin.validateAdmin);
router.patch('/form/:visbility/visible', admin.validateAdmin);
router.patch('/form/:state/open', admin.validateAdmin);

module.exports = router;