const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
            const newAuthData = new authModel({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword
            });
            newAuthData.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created successfully",
                        user: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Problem while creating user"
                    })
                })
        })

});

router.post('/login', (req, res) => {
    let fetchedUser;
    authModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Authentication failed" });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({ message: "Authentication failed" });
            }
            const token = jwt.sign(
                { email: req.body.email, userId: fetchedUser._id, userName: fetchedUser.userName },
                "sv-db-authentication-token",
                { expiresIn: '1h' }
            );
            res.status(200).json({
                message: "Authentication successfull",
                token: token,
                user: {
                    email: fetchedUser.email,
                    id: fetchedUser._id,
                    userName: fetchedUser.userName
                },
                expiresIn: 3600
            })
        })
        .catch((error) => {
            return res.status(401).json({ message: "Authentication failed", error: error });
        })
})

module.exports = router;