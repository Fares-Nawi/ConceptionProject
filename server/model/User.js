const mongoose = require("mongoose");
const bcrypt = require("bcrypt");




const userSchema = new mongoose.Schema({


  nom: {
    type: String,
    required: true,
    max: 255,
  },
  prenom: {
    type: String,
    required: true,
    max: 255,
  },
  age: {
    type: Number,
    required: true,
    max: 255,
  },
  cin: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
  },
  adresse: {
    type: String,
    required: true,
    max: 255,
  },
  profession: {
    type: String,
    min: 4,
    max: 255,
  },
  iban: {
    type: String,
    unique: true,
    min: 6,
    max: 255,
  },
  cv: {
    type: String,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  role: {
    type: String,
    required: true,
    enum: ['CLIENT', 'REDACTEUR']
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordRequest: [
    {
      date: { type: Date, default: Date.now },
      token: { type: String },
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
