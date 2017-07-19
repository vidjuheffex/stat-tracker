var express = require("express");
var router = express.Router();
const Activity = require("../models/Activity");

router.get("/activities", function(req, res) {
  Activity.find()
    .then(activity => {
      res.send(activity);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/activities", function(req, res) {
  let userActivity = req.body.activity;
  let newActivity = new Activity(userActivity);
  newActivity
    .save()
    .then(activity => {
      res.send(activity);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/activities/:id", function(req, res) {
  let specifiedActivity = req.params.id - 1;
  Activity.find()
    .then(activity => {
      res.send(activity[specifiedActivity]);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.put("/activities/:id", function(req, res) {
  Activity.updateOne({ _id: req.params.id }, req.body)
    .then(activity => {
      res.send(activity);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.delete("/activities/:id", function(req, res) {
  Activity.deleteOne({ _id: req.params.id })
    .then(deletedActivity => {
      res.send("Deleted activity");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/activities/:id/stats", function(req, res) {
  Activity.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: req.body },
    { upsert: true }
  ).then(updatedStat => {
    updatedStat
      .save()
      .then(newStat => {
        res.send(newStat);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
});

router.delete("/stats/:id", function(req, res) {
  Activity.findOneAndUpdate(
    { "stats._id": req.params.id },
    { $pull: { stats: { _id: req.params.id } } }
  )
    .then(row => {
      console.log(row);
      row.save().then(deletedItem => {
        res.send("Deleted Activity");
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
module.exports = router;
