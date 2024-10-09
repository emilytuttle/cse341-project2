const express = require('express');
const routes = express.Router();
const { userValidationRules, validate } = require('../validation.js')

const employeeController = require('../controllers/employees');

routes.get('/', employeeController.getAll);

routes.get('/:id', employeeController.getSingle);

routes.post('/', userValidationRules(), validate, employeeController.createEmployee);
routes.put('/:id', userValidationRules(), validate, employeeController.updateEmployee);
routes.delete('/:id', employeeController.deleteEmployee);

module.exports = routes;