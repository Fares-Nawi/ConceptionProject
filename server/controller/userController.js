const User = require("../model/User");
var createError = require("http-errors");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    age: req.body.age,
    cin: req.body.cin,
    adresse: req.body.adresse,
    prfession: req.body.prfession,
    iban: req.body.iban,
    cv: req.body.cv,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  const doesExist = await User.findOne({ email: user.email });
  if (doesExist) res.status(400).send({ message: "Email already used!" });
  else {
    user
      .save(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while creating a create operation",
        });
      });
  }
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    User.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id " + id });
      });
  } else {
    User.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving user Information",
        });
      });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update user with ${id}/Maybe user not found!",
        });
      } else {
        res.send(data);
        
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Error update user information" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Cannot delete with id ${id}.Maybe id is wrong " });
      } else {
        res.send({
          messagge: "User was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};



exports.sendMail = async (req, res) => {
  const emailFrom = req.params.emailFrom;
  const emailTo = req.params.emailTo;
  const subject = req.params.subject;
  const text = req.params.text;



  console.log(">>>>>>>>>>> " + emailFrom)
   //send mail to user 
   var mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: subject,
    text: text
  };
  sendMail(mailOptions);

  
};