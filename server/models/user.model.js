const mongoose = require('mongoose');
// import de validator pour checker le format des email
const checker = require("validator");
// import de bcypt pour crypter les mots de passe user 
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    pseudo: {
      type: String,
      required: [true, 'Le pseudo est obligatoire.'],
      trim: true
    },
    email: {
      required: true,
      unique: true,
      type: String,
      validate: {
        validator: function (v) {
          return checker.isEmail(v);
        },
        message: "L'email n'est pas à un format valide",
      },
    },
    password: {
        type: String,
        required: [true, 'Email obligatoire.'],
        trim: true
    },
  });


// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
  } catch (err) {
    next(err);
  }
});


// Methodes utiliées pour validator et bcrypt
//-------------------------------------------------------------------------
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Validating the candidate password with stored hash and hash function
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Initialisation des schemas dans des variables
const User = mongoose.model('User', userSchema, 'users');
module.exports = User;