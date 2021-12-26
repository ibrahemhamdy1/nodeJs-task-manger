const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then((result) => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

router.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then(task => {
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch((e) => {
        res.status(500).send(e.message);
    });
});

router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdated = ['completed', 'description'];
    const isValidOperation = updates.every((updates) => allowedUpdated.includes(updates));

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid updates"})
    }

    try {

        const task = await Task.findById(req.params.id);

        updates.forEach((update) => task[update] = req.body[update]);

        await task.save();

        if(!task) {
           return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task) {
           return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
         res.status(500).send(e);
    }
});

module.exports = router;