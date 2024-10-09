const express = require('express');
const routes = express.Router();

const employeeController = require('../controllers/employees');

routes.get('/', employeeController.getAll);

routes.get('/:id', employeeController.getSingle);

routes.post('/', employeeController.createEmployee);
routes.put('/:id', employeeController.updateEmployee);
routes.delete('/:id', employeeController.deleteEmployee);

module.exports = routes;