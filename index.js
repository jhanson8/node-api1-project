// implement your API here
/* jshint esversion: 6 */
//import express from 'express'; // ES2015 Modules
const express = require("express"); //CommonJS modules <<<< npm i express
const cors = require("cors");
const Hubs = require("./data/db.js");

const server = express();
server.get("/", (req, res) => {
  res.json({ hello: "Web 26" });
});

server.use(express.json()); //needed for POST and PUT/PATCH
server.use(cors());

//GET a list of users
server.get("/api/users", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
  res.status(200);
});

//GET a specific user

server.get("/api/users/:id", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
  res.status(200);
});

//add a hub
server.post("/api/users", (req, res) => {
  // axios.post(url, data, options); the data will be in body of the request
  const hubInfo = req.body;
  // validate the data, and if the data is valid save it
  if (!hubInfo.name || !hubInfo.bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
    return null;
  }
  Hubs.insert(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

//DELETE
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params.id;

  if (!id.id) {
    res.status(404).json({
      errorMessage: "The user with the specified ID does not exist."
    });
    return null;
  }

  Hubs.remove(id)
    .then(removed => {
      res.status(200).json(removed);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

// PUT Request
server.put("/api/users/:id", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else {
    Hubs.update(req.params.id, req.body).then(user => {
      if (!user) {
        res.status(404).json({
          errorMessage: "The user with the specified id does not exist."
        });
      } else {
        res.status(202).json(user);
      }
    });
  }
});

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
