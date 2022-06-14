const models = require("../models");
const Comment = models.comments;

exports.findAllComments = (req, res, next) => {
  Comment.findAll({ where: { postId: req.params.id } })
    .then((comments) => {
      console.log(comments);
      res.status(200).json({ data: comments });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      console.log(comment);
      res.status(200).json(comment);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.createComment = (req, res, next) => {
  const commentObject = req.body;
  const comment = new Comment({
    ...commentObject,
  });
  comment
    .save()
    .then(() => {
      Comment.findAll({
        where: { articleId: req.body.articleId },
      }).then((comments) => {
        res.status(200).json(comments);
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
