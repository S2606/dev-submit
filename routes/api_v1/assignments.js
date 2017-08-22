/**
 * Created by varun on 5/24/17.
 */

const express = require('express');
const db = require('../../db');
const utils = require('../../utils')


const router = express.Router();

//TODO add echo support

//tested
router.post('/new',utils.acl.ensureTeacher, function (req, res) {
    db.actions.assignments.addAssignment(req.body.name, req.body.desc, req.body.batchId, data => {
        let arr = [];
        arr.push(data.dataValues);
        res.send(arr);
    });
});

//tested
router.get('/', utils.acl.ensureTeacher,function (req, res) {
    var options = {};

    let type = 'all';
    let name = req.query.name;
    let batchId = req.query.batchId;

    if (name) {
        options.name = name;
    } else if (batchId) {
        options.id = id;
    }
    db.actions.assignments.getAssignments(options, data => {
        res.send(data);
    });
});

//tested
router.get('/:id', utils.acl.ensureTeacher,function (req, res) {
    db.actions.assignments.searchAssignment(req.params.id, data => {
        res.send(data);
    });
});

//tested
router.put('/:id',utils.acl.ensureTeacher, function (req, res) {
    console.log(req.body);
    db.actions.assignments.editAssignment(req.params.id, req.body.name, req.body.desc, data => {
        res.send(data);
    });
});

//tested
router.delete('/:id',utils.acl.ensureAdmin, function (req, res) {
    db.actions.assignments.deleteAssignment(req.params.id, data => {
        res.send(data);
    });
});

//tested
router.post('/:id/addToBatch/:batchId',utils.acl.ensureTeacher, function (req, res) {
    db.actions.batches.addAssignmentToBatch(req.params.id, req.params.batchId, data => {
        res.send(data);
    });
});

module.exports = router;
