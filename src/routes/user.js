const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then((result) => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

router.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then(user => {
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((e) => {
        res.status(500).send(e.message);
    });
});

router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdated = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((updates) => allowedUpdated.includes(updates));

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid updates"})
    }

    try {
        const user = await User.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!user) {
           return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
         res.status(400).send(e);
    }
});

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) {
           return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
         res.status(500).send(e);
    }
});

module.exports = router;