const models = require("../models");
const jwt = require("jsonwebtoken");

//création d'un post
exports.createPost = (req, res) => {
  console.dir(req.body);
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
  const userId = decodedToken.userId;

  if (!req.file) {
    models.Post.create({
      UserId: userId,
      post_content: req.body.post_content,
      like: 0,
    })
      .then((newPost) =>
        res.status(201).json({ newPost, message: "Post publié !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else if (req.file) {
    models.Post.create({
      UserId: userId,
      post_content: req.body.post_content,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      like: 0,
    })
      .then((newPost) =>
        res.status(201).json({ newPost, message: "Post publié !" })
      )
      .catch((error) => res.status(400).json({ error }));
  }
};

//suppression d'un post
exports.deletePost = (req, res) => {
  models.Post.findOne({ where: { id: req.params.id } })
    .then(() => {
      models.Post.destroy({
        where: { id: req.params.id },
      })
        .then(() => res.status(200).json({ message: "Post supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

//affichage des posts
exports.getAllPosts = (req, res, next) => {
  models.Post.findAll({
    include: [models.Comment, models.User],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.json({ data: posts }))
    .catch((err) => res.status(500).json({ err }));
};
