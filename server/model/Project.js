const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


  
const redacteurWork = new mongoose.Schema({
  work: { type: String },
  status: { type: Boolean,default :false },
});

const projectSchema = new mongoose.Schema({




  author: {
    type: mongoose.Types.ObjectId,
    ref : "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 1024,
  },
  description: {
    type: String,
    required: true,
  },
  reducateur: {
    type: mongoose.Types.ObjectId,
    ref : "User",
    max: 1024,
    default:null
  },
  date: {
    type: Date,
    default: Date.now,
  },
  propositions: [
    {
      id_redacteur: { type: mongoose.Types.ObjectId },
      prix: { type: Number },
    },
  ],
  redacteurWork: [redacteurWork]






});



module.exports = mongoose.model("Project", projectSchema);
