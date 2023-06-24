const models = require("../models");
const jwt = require("jsonwebtoken");
const like = require("../models/like");

exports.likePost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  const postId = req.params.postId;
  const userLiked = await models.Like.findOne({
    where: { UserId: userId, PostId: postId },
  });

  if (!userLiked) {
    models.Like.create({
      UserId: userId,
      PostId: postId,
    })
      .then(() => {
        models.Post.findOne({
          where: { id: postId },
        })
          .then((post) => {
            post
              .update({
                like: post.like + 1,
              })
              .then(() => res.status(201).json({ message: "Like ajouté ! " }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
  } else if (userLiked) {
    models.Like.destroy({
      where: {
        UserId: userId,
        PostId: postId,
      },
    })
      .then(() => {
        models.Post.findOne({
          where: { id: postId },
        })
          .then((post) => {
            post
              .update({
                like: post.like - 1,
              })
              .then(() => res.status(201).json({ message: "Like supprimé ! " }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => {
        console.dir(error);
        res.status(400).json({ error });
      });
  }
};
