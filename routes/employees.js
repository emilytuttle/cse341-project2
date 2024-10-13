const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../validation.js')
const { isAuthenticated } = require("../middleware/authenticate")

const employeeController = require('../controllers/employees');

router.get('/', employeeController.getAll);

router.get('/:id', employeeController.getSingle);

router.post('/', isAuthenticated, userValidationRules(), validate, employeeController.createEmployee);
router.put('/:id', isAuthenticated, userValidationRules(), validate, employeeController.updateEmployee);
router.delete('/:id', isAuthenticated, employeeController.deleteEmployee);

module.exports = router;