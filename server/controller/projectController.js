const Project = require("../model/Project");
var createError = require("http-errors");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const project = new Project({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    reducateur: req.body.reducateur
  
  });

  
    project
      .save(project)
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
 

 
};

exports.propose = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;

  // Extract the new proposition data from the request body
  const newProposition = {
    id_redacteur: req.body.id_redacteur,
    prix: req.body.prix,
  };

  Project.findByIdAndUpdate(
    id,
    { $push: { propositions: newProposition } },
    { useFindAndModify: false, new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Project with ${id}. Maybe Project not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Error updating Project information" });
    });
};


exports.uploadWork = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;

  // Extract the new proposition data from the request body
  const newUploadwork = {
    work: req.body.work 
  };
  Project.findOneAndUpdate(
    { _id: id },
    { $set: { 'redacteurWork.status': false, 'redacteurWork.work': newUploadwork.work } },
    { new: true },
    (err, updatedProject) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Error updating work" });
      } else {
        if (!updatedProject) {
          res.status(404).send({
            message: `Cannot update work for redacteur in project ${id}. Maybe project not found!`,
          });
        } else {
          res.send(updatedProject);
        }
      }
    }
  );
};

exports.confirmWork = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;

  // Extract the new proposition data from the request body
  const newUploadwork = {
    status: req.body.status
  };
  Project.findOneAndUpdate(
    { _id: id},
    { $set: { 'redacteurWork.status': newUploadwork.status } },
    { new: true },
    (err, updatedProject) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Error updating work" });
      } else {
        if (!updatedProject) {
          res.status(404).send({
            message: `Cannot update work for redacteur in project ${id}. Maybe project not found!`,
          });
        } else {
          res.send(updatedProject);
        }
      }
    }
  );
};



exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Project.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found Project with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving Project with id " + id });
      });
  } else {
    Project.find()
      .then((Project) => {
        res.send(Project);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving Project Information",
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

 /* const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);*/

  Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update Project with ${id}/Maybe Project not found!",
        });
      } else {

        res.send(data);
        
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Error update Project information" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Project.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Cannot delete with id ${id}.Maybe id is wrong " });
      } else {
        res.send({
          messagge: "Project was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id,
      });
    });
};
