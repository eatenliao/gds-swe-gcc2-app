const express = require("express");
const router = express.Router();
const apiDB = require("../model/api");

router.get("/getUsers", (req, res) => {
    apiDB.getUsers((err, result) => {
        if (err) {
            return res.status(500).send({ message: "Internal Server Error" });
        }
        return res.status(200).send(result);
    });
});

router.post("/postResponse", (req, res) => {
    console.log(req.body);
    const { name, temperature, question1, question2 } = req.body;
    apiDB.postResponse(name, temperature, question1, question2, (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Internal Server Error" });
        }
        return res.status(201).send({ message: "Success" });
    });
});

module.exports = router;
