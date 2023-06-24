const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");

//création de l'utilisateur
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = models.User.create({
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash,
      });
      user
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//connexion de l'utilisateur
exports.login = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé!" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            console.dir(valid);
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Mot de passe incorrect !" });
            } else {
              res.status(200).json({
                userId: user.id,
                admin: user.isAdmin,
                token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//afficher compte utilisateur
exports.getOneUser = (req, res) => {
  models.User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

//supprimer compte utilisateur
exports.deleteUser = (req, res) => {
  models.User.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(200).json({ message: "Compte utilisateur supprimé" })
    )
    .catch((error) => res.status(400).json({ error }));
};
