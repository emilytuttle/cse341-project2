const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["teams"]
    const result = await mongodb.getDatabase().db().collection('teams').find();
    result.toArray().then((teams) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teams);
    })
    .catch((err) => {
        console.log(err)
    });

};
const getSingle = async (req, res) => {
    //#swagger.tags=["teams"]
    const teamId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('teams').find({_id: teamId});
    result.toArray().then((teams) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teams[0]);
    })
    .catch((err) => {
        console.log(err)
    });
};

const createTeam = async (req, res) => {
    //#swagger.tags=["teams"]
    const team = {
        teamName: req.body.teamName,
        teamArea: req.body.teamArea,
        teamResponsibility: req.body.teamResponsibility
        
    };
    const response = await mongodb.getDatabase().db().collection('teams').insertOne(team)
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while creating team')
    }
}

const updateTeam = async (req, res) => {
    //#swagger.tags=["teams"]
    const teamId = new ObjectId(req.params.id)
    const team = {
        teamName: req.body.teamName,
        teamArea: req.body.teamArea,
        teamResponsibility: req.body.teamResponsibility
    };
    

    const response = await mongodb.getDatabase().db().collection('teams').replaceOne({_id: teamId}, team)
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while updating team')
    }
    
}

const deleteTeam = async (req, res) => {
    //#swagger.tags=["teams"]
    const teamId = new ObjectId(req.params.id)

    const response = await mongodb.getDatabase().db().collection('teams').deleteOne({_id: teamId});
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else if (teamId = null) {
        res.status(500).json(response.error || 'No teamId provided')
    }
    else {
        res.status(500).json(response.error || 'Error occurred while deleting team')
    }
}

module.exports = {
    getAll,
    getSingle,
    createTeam,
    updateTeam,
    deleteTeam
};