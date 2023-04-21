const models = require("../models");
const jwt = require("jsonwebtoken");

//afficher les commentaires
exports.getAllComments = (req, res) => {
  models.Comment.findAll({
    include: [models.Post, models.User],
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => res.status(200).json({ data: comments }))
    .catch((error) => res.status(400).json({ error }));
};

//ajouter un commentaire
exports.createComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
  const userId = decodedToken.userId;

  const newComment = models.Comment.create({
    UserId: userId,
    PostId: req.body.PostId,
    comment_content: req.body.comment_content,
  });
  newComment
    .then(() => res.status(201).json({ message: "Commentaire ajouté ! " }))
    .catch((error) => res.status(400).json({ error }));
};

//supprimer un commentaire
exports.deleteComment = (req, res) => {
  models.Comment.findOne({ where: { id: req.params.id } })
    .then(() => {
      models.Comment.destroy({
        where: { id: req.params.id },
      })
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
