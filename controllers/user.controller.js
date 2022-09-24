const db = require("../models");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../helpers/token").generateAccessToken;
const User = db.user;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    console.log(Object.keys(db));
    console.log(req.body);
    // Validate request
    if (!req.body.name || !req.body.password || !req.body.sex) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const salt = bcrypt.genSaltSync(10);
    // now we set user password to hashed password
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // Create a User
    const user = {
      name: req.body.name,
      password: hashedPassword.toString(),
      sex: req.body.sex
    };
  
  
    // Save User in the database
    User.create(user)
      .then(() => {
        res.send({token: generateAccessToken({name : req.body.name})});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

  exports.findAll = (req, res) => {
  
    User.findAll(
        {attributes: {exclude: ['password']},}
    )
    
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };