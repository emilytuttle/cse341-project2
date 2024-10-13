const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../validation.js')
const { isAuthenticated } = require("../middleware/authenticate")

const teamController = require('../controllers/teams');

router.get('/', teamController.getAll);

router.get('/:id', teamController.getSingle);

router.post('/', isAuthenticated, userValidationRules(), validate, teamController.createTeam);
router.put('/:id', isAuthenticated, userValidationRules(), validate, teamController.updateTeam);
router.delete('/:id', isAuthenticated, teamController.deleteTeam);

module.exports = router;