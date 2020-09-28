const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

//Select all
router.get("/", (req, res) => {
  burger.selectAll(function (data) {
    let burgerObject = {
      burgers: data,
    };
    res.render("index", burgerObject);
  });
});

//Insert One
router.post("/burger", (req, res) => {
  burger.insertOne(["burger_name"], [req.body.burger_name], function (result) {
    res.status(200).end();
  });
});

//Update 
router.put('/burgers/:id', (req, res) => {
    let condition = req.params.id
    console.log("condition", condition)
    burger.updateOne(
        //changes the devoured val to true 
        {devoured: true},
        condition,
        function (result) {
            res.status(200).end();
    })
});


module.exports = router;
