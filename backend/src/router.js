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

//post
router.post('/user', user.validateBody, userController.createUser);
router.post('/question', question.validateBody, admin.validateAdmin, questionController.createQuestion);
router.post('/form', form.validateBody, admin.validateAdmin, formController.createForm);
router.post('/answer', answer.validateBody, answerController.createAnswer);

//get
router.get('/user', userController.getUser);
router.get('/forms', formController.getAllForms);
router.get('/form/', formController.getFormById);
router.get('/form/answers/:id', admin.validateAdmin, formController.getAllFormAnswers);

//put
router.put('/user/:id');
router.put('/question/:id', admin.validateAdmin);
router.put('/form/:id', admin.validateAdmin);

//delete
router.delete('/user/:id');
router.delete('/question/:id', admin.validateAdmin);
router.delete('/form/:id', admin.validateAdmin);
router.delete('/form/:id/answers', admin.validateAdmin);

//patch
router.patch('/answer/:grade/grade', admin.validateAdmin);
router.patch('/form/:visbility/visible', admin.validateAdmin);
router.patch('/form/:state/open', admin.validateAdmin);

module.exports = router;