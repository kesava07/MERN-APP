const express = require('express');
const app = express();
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kesava07:<password>@cluster0-8qnzo.mongodb.net/sv-db?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected..")
    })
    .catch(() => {
        console.log("Failed to connect")
    })

app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    next();
})
app.use("/v1", require('./backend/router'));
app.listen(process.env.PORT || 5050);