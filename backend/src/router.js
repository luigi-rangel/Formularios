const express = require('express');
const router = express.Router();

const cors = require('cors');

router.use(cors());

const userController = require('./controllers/userController');
const formController = require('./controllers/formController');

const user = require('./middlewares/userMiddleware');
const form = require('./middlewares/formMiddleware');

//post
router.post('/user', user.validateBody, userController.createUser);
router.post('/question');
router.post('/form', form.validateBody, form.validateAdmin, formController.createForm);
router.post('/answer');

//get
router.get('/user', userController.getUser);
router.get('/forms');
router.get('/form/:id');
router.get('/form/');
router.get('/answer');

//put
router.put('/user/:id');
router.put('/question/:id');
router.put('/form/:id');

//delete
router.delete('/user/:id');
router.delete('/question/:id');
router.delete('/form/:id');
router.delete('/form/:id/answers');

//patch
router.patch('/answer/:grade/grade');
router.patch('/form/:visbility/visible');
router.patch('/form/:state/open');

module.exports = router;