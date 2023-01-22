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
router.post('/answers/:id', answer.validateBody, user.validateUser, form.validateState, answerController.createAnswers);

router.get('/user', userController.getUser);
router.get('/forms', admin.validateAdmin, formController.getAllForms);
router.get('/visible/forms', formController.getVisibleForms);
router.get('/form', user.validateUserOrAdmin, formController.getFormAnswersById);
router.get('/form/answers/:id', admin.validateAdmin, formController.getAllFormAnswers);

router.put('/user', user.validateUserOrAdmin, userController.updateUser);
router.put('/question', admin.validateAdmin, questionController.updateQuestion);
router.put('/form', admin.validateAdmin, formController.updateForm);
router.put('/answer', user.validateUser, answerController.updateAnswer);

router.delete('/user/', user.validateUserOrAdmin, userController.deleteUser);
router.delete('/question/:id', admin.validateAdmin, questionController.deleteQuestion);
router.delete('/form/:id', admin.validateAdmin, formController.deleteForm);
router.delete('/answers/form', admin.validateAdmin, answerController.deleteFormAnswers);

router.patch('/user/logout', user.validateUser, userController.logout);
router.patch('/answer/:grade/grade', admin.validateAdmin, answer.validateQuery, answerController.updateGrade);
router.patch('/form/:visibility/visible', admin.validateAdmin, form.validateQuery, formController.updateVisibility);
router.patch('/form/:state/open', admin.validateAdmin, form.validateQuery, formController.updateState);

module.exports = router;