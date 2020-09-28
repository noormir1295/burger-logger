const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

//Select all
router.get("/", (req, res) => {
  burger.selectAll(function (data) {
    let burgerObject = {
      burger: data,
    };
    res.render("index", burgerObject);
  });
});

//Insert One
router.post("/api/burger", (req, res) => {
  burger.insertOne(
    ["burgerName", "devoured"],
    [req.body.burgerName, req.body.devoured],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
});

//Update
router.put("/api/burgers/:id", (req, res) => {
  let condition = "id= " + req.params.id;
  burger.updateOne({ devoured: req.body.devoured }, condition, function (
    result
  ) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
 router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.deleteOne(condition, function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

module.exports = router;
