const models = require("../models");
const jwt = require("jsonwebtoken");

//ajouter un like
exports.likePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
  const userId = decodedToken.userId;
  const postId = req.params.postId;
  let { userLiked } = { userId, postId };

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
  }
  /*else if (userLiked) {
            models.Like.destroy({
                UserId: userId,
                PostId: postId,
            })
            .then(() => {
                models.Post.findOne({
                    where : {id : postId },
                })
                    .then((post)=> {
                        post.update({
                            like: post.like - 1,
                        })
                        .then(() => res.status(201).json({message: "Like supprimé ! " }))
                        .catch(error => res.status(400).json({ error}));
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(400).json({ error }));
        }*/
};
