const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit contenir entre 10 et 64 caractères, au moins une majuscule, une minuscule et un chiffre et ne doit pas contenir d'espace.",
    });
  } else {
    next();
  }
};
