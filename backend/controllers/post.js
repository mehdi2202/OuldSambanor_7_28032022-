const models = require("../models");
const Post = models.post;
const Comment = models.comment;
const Like = models.like;

exports.findAllPosts = (req, res, next) => {
  Post.findAll({ order: [["createdAt", "DESC"]] })
    .then((posts) => {
      console.log(posts);
      res.status(200).json({ data: posts });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findPostsByUserId = (req, res, next) => {
  Post.findAll({
    where: { userId: req.params.id },
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      console.log(posts);
      res.status(200).json({ data: posts });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  if (title === null || title === "" || content === null || content === "") {
    return res.status(400).json({
      error:
        "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article",
    });
  }

  const postObject = req.body;

  const post = new Post({
    ...postObject,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  if (title === null || title === "" || content === null || content === "") {
    return res.status(400).json({
      error:
        "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un article",
    });
  }
  const postObject = req.body;

  Post.update(
    { ...postObject, id: req.params.id },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ message: "Post changé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Like.destroy({ where: { articleId: req.params.id } })
    .then(() =>
      Comment.destroy({ where: { articleId: req.params.id } }).then(() =>
        Post.destroy({ where: { id: req.params.id } }).then(() =>
          res.status(200).json({ message: "Post supprimé !" })
        )
      )
    )
    .catch((error) => res.status(400).json({ error }));
};
