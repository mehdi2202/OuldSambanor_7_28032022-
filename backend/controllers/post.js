const models = require("../models");
const jwt = require("jsonwebtoken");
const { Post } = require("../models");
const { post } = require("../app");

//création d'un post
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  if (!req.file) {
    models.Post.create({
      post_content: req.body.post_content,
      UserId: userId,
      like: 0,
    })
      .then((newPost) =>
        res.status(201).json({ newPost, message: "Post publié !" })
      )
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else if (req.file) {
    models.Post.create({
      post_content: req.body.post_content,
      UserId: userId,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      like: 0,
    })
      .then((newPost) =>
        res.status(201).json({ newPost, message: "Post publié !" })
      )
      .catch((error) => {
        console.dir(error);
        res.status(400).json({ error });
      });
  }
};

//suppression d'un post
exports.deletePost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userID = decodedToken.userId;
  const user = await models.User.findOne({ where: { id: userID } });
  const isAdmin = user.dataValues.isAdmin;

  models.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (userID === post.UserId || isAdmin === true) {
        models.Post.destroy({
          where: { id: req.params.id },
        })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => {
            res.status(403).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

//modification d'un post
exports.updatePost = (req, res, next) => {
  // const post_content = req.body.post_content;
  models.Post.findOne({ where: { id: req.params.id } })
    .then((newPost) => {
      if ((userID === post.UserId || isAdmin === true) && !req.file) {
        models.Post.update({
          post_content: req.body.post_content,
          like: 0,
        })
          .then(() =>
            res.status(200).json({ newPost, message: "Post modifié !" })
          )
          .catch((error) => {
            res.status(403).json({ error });
          });
      } else if ((userID === post.UserId || isAdmin === true) && req.file) {
        models.Post.update({
          post_content: req.body.post_content,
          image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
          like: 0,
        })
          .then((newPost) =>
            res.status(200).json({ newPost, message: "Post modifié !" })
          )
          .catch((error) => {
            res.status(403).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });

  // const postObj = req.body;

  // Post.update(
  //   { ...postObj, id: req.params.id },
  //   { where: { id: req.params.id } }
  // )
  //   .then(() => res.status(200).json({ message: "Post modifié !" }))
  //   .catch((error) => res.status(400).json({ error }));

  // if (post_content === null || post_content === "") {
  //   return res
  //     .status(400)
  //     .json({ error: "Veuillez remplir les champs pour créer un post" });
  // } else if (Post.update)
  //   (({ ...post_content, id: req.params.id }, { where: { id: req.params.id } })
  //     .then(() => res.status(200).json({ message: "Post modifié !" }))
  //     .catch((error) => res.status(400).json({ error })));
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
