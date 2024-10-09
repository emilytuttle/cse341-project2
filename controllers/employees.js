const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator')

const getAll = async (req, res) => {
    //#swagger.tags=["Employees"]
    const result = await mongodb.getDatabase().db().collection('employees').find();
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    })
    .catch((err) => {
        console.log(err)
    });

};
const getSingle = async (req, res) => {
    //#swagger.tags=["Employees"]
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').find({_id: employeeId});
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees[0]);
    })
    .catch((err) => {
        console.log(err)
    });
};

const createEmployee = async (req, res) => {
    //#swagger.tags=["Employees"]
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        startDate: req.body.startDate,
        wage: req.body.wage,
        position: req.body.position,
        team: req.body.team
    };
    const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee)
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while creating employee')
    }
}

const updateEmployee = async (req, res) => {
    //#swagger.tags=["Employees"]
    const employeeId = new ObjectId(req.params.id)
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        startDate: req.body.startDate,
        wage: req.body.wage,
        position: req.body.position,
        team: req.body.team
    };
    

    const response = await mongodb.getDatabase().db().collection('employees').replaceOne({_id: employeeId}, employee)
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while updating employee')
    }

   
    
}

const deleteEmployee = async (req, res) => {
    //#swagger.tags=["Employees"]
    const employeeId = new ObjectId(req.params.id)

    const response = await mongodb.getDatabase().db().collection('employees').deleteOne({_id: employeeId});
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else if (employeeId = null) {
        res.status(500).json(response.error || 'No employeeId provided')
    }
    else {
        res.status(500).json(response.error || 'Error occurred while deleting employee')
    }
}

module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
};