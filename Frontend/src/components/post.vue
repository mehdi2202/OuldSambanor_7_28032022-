<template>
  <div class="post_block" v-for="post in posts" :key="post.id">
    <div class="post_user">
      <h3>{{ post.User.firstName }} {{ post.User.name }}</h3>
    </div>
    <div class="post_content" v-if="!(post.id == selectedPostId)">
      <p class="post_text">{{ post.post_content }}</p>
      <p class="post_img">
        <img :src="post.image" alt="" v-if="post.image != null" />
      </p>
    </div>
    <form class="post_content" v-if="post.id == selectedPostId">
      <input
        :id="`text_update_post_${post.id}`"
        type="text"
        class="post_text"
        :value="post.post_content"
      />
      <div class="feed_buttons">
        <p class="post_img">
          <img :src="post.image" alt="" v-if="post.image != null" />
        </p>
        <input
          :id="`img_update_post_${post.id}`"
          type="file"
          ref="file"
          accept="image/*"
        />
      </div>
    </form>
    <div class="post_icon">
      <span class="post_like">
        <button class="post_button" @click="likePost(post)">
          J'aime
          <i class="fa fa-heart"></i>
        </button>
        <p class="likeNbr">{{ post.like }}</p>
      </span>
      <button
        class="post_button update_button"
        v-if="
          (post.UserId == userId || isAdmin == 'true') &&
          !(post.id == selectedPostId)
        "
        @click.prevent="changeSelectedPostId(post.id)"
      >
        Modifier
        <i class="fa fa-pencil"></i>
      </button>
      <button
        class="post_button delete_button"
        v-if="
          (post.UserId == userId || isAdmin == 'true') &&
          !(post.id == selectedPostId)
        "
        @click.prevent="deletePost(post)"
      >
        Supprimer
        <i class="fa fa-trash"></i>
      </button>
      <button
        class="post_button update_button"
        v-if="
          (post.UserId == userId || isAdmin == 'true') &&
          post.id == selectedPostId
        "
        @click.prevent="updatePost(post)"
      >
        Valider
        <i class="fa fa-check-square"></i>
      </button>
      <button
        class="post_button delete_button"
        v-if="
          (post.UserId == userId || isAdmin == 'true') &&
          post.id == selectedPostId
        "
        @click.prevent="changeSelectedPostId(0)"
      >
        Annuler
        <i class="fa fa-window-close"></i>
      </button>
    </div>
    <div class="comment_block">
      <div
        class="comment_content"
        v-for="comment in comments"
        :key="comment.id"
      >
        <input
          title="commentaire"
          class="comment_create"
          placeholder="Votre commentaire..."
          v-model="comment_content"
          @keyup.enter.prevent="createComment(post)"
        />
      </div>
      <div class="comment_list" v-for="comment in comments" :key="comment.id">
        <div class="comment" v-if="post.id == comment.PostId">
          <span>
            <h4 class="comment_user">
              {{ comment.User.firstName }} {{ comment.User.name }}
            </h4>
            <p class="comment_text">{{ comment.comment_content }}</p>
          </span>
          <button
            class="post_button"
            v-if="comment.UserId == userId"
            @click="deleteComment(comment)"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "postContent",

  data() {
    return {
      posts: [],
      comments: [],
      User: {},
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
      comment_content: "",
      likes: [],
      selectedPostId: 0,
    };
  },
  mounted() {
    fetch("http://localhost:3000/api/post/", {
      method: "GET",
      header: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.posts = data.data;
      })
      .catch((error) => console.log("Erreur post non trouvé"));

    fetch("http://localhost:3000/api/comment/", {
      method: "GET",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    })
      .then((res) => res.json())
      .then((data) => {
        this.comments = data.data;
      })
      .catch((error) => console.log(err));
  },
  methods: {
    changeSelectedPostId(id) {
      this.selectedPostId = id;
    },
    createComment(post) {
      let newComment = {
        UserId: localStorage.getItem("userId"),
        PostId: post.id,
        comment_content: this.comment_content,
      };
      if (this.comment_content === "") {
        alert("Remplir le champ vide !");
      } else {
        fetch("http://localhost:3000/api/comment/", {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: new Headers({
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        })
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              if (res.status === 201) {
                document.location.reload();
                this.$router.push("/feed");
              } else {
                alert("Erreur lors de la publication de votre commentaire");
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updatePost(post) {
      const newContent = document.getElementById(
        `text_update_post_${post.id}`
      ).value;

      const newImg = document.getElementById(
        `img_update_post_${post.id}`
      ).value;

      console.dir(newContent);
      console.dir(newImg);

      let newPost = new FormData();
      newPost.append("post_content", newContent);
      newPost.append("image", newImg);

      let config = {
        method: "put",
        url: `http://localhost:3000/api/post/`,
        headers: {
          "Content-Type": "multipart/form-data;boundary=test",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          if (response.status === 200) {
            document.location.reload();
            this.$router.push("/feed");
          }
        })
        .catch(function (error) {
          console.log("error");
        });
    },
    change_img() {
      newImg = this.$refs.newImg.files[0];
    },
    deletePost(post) {
      if (confirm("Voulez vous supprimer ce post ? ")) {
        let config = {
          method: "delete",
          url: `http://localhost:3000/api/post/${post.id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.status === 200) {
              alert("Le post a bien été supprimé");
              document.location.reload();
              this.$router.push("/feed");
            }
          })
          .catch(function (error) {});
      }
    },
    deleteComment(comment) {
      fetch(`http://localhost:3000/api/comment/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            document.location.reload();
            this.$router.push("/feed");
            alert("Le commentaire est bien supprimé !!");
          } else {
            console.log(res.json());
          }
        })
        .catch(function (error) {
          alert("Erreur lors de la suppression du commentaire !!");
        });
    },
    likePost(post) {
      let like = {
        UserId: JSON.parse(localStorage.getItem("userId")),
        PostId: post.id,
      };

      fetch(`http://localhost:3000/api/like/${post.id}`, {
        method: "POST",
        body: JSON.stringify(like),
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => {
          res.json().then((data) => {
            if (res.status === 201) {
              document.location.reload();
              this.$router.push("/feed");
            } else {
              console.log("Erreur");
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeUpdate() {
    if (localStorage.getItem("token") == null) {
      alert("Veuillez vous connecter !");
      this.$router.push("/login");
    } else {
      console.log("ok");
    }
  },
};
</script>

<style lang="scss">
@import "../style.scss";

a {
  text-decoration: none;
}
.post_block {
  background-color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border: solid 2px $border-color;
  border-radius: 40px;
  margin: 15px;
  padding: 20px;

  .post_content {
    color: black;
  }

  .post_user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    padding: 4px;
    border-bottom: solid 2px $border-color;
    color: red;
  }

  img {
    object-fit: contain;
    width: 100%;
    max-height: 500px;
  }
}

.post_img {
  display: flex;
  flex-direction: column;
}

.post_icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: solid 2px $border-color;
  border-bottom: solid 2px $border-color;
}
.post_like {
  display: flex;
  align-items: center;
  color: red;
}
.post_button {
  border: none;
  font-weight: 600;
  font-size: 16px;
  color: $font-color;
  background-color: white;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
}
.delete_button {
  color: black;
}

.update_button {
  color: black;
}

.fa {
  font-size: 20px;
  padding: 5px;
}
.fa-heart {
  color: $font-color;
  transition: cubic-bezier(0.2, 3, 0.4, 1) 0.4s;
}
.fa-trash {
  color: black;
  transition: cubic-bezier(0.2, 3, 0.4, 1) 0.4s;
}
.comment_block {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  color: black;

  .comment_create {
    width: 99%;
    height: 25px;
    border: solid 1px $border-color;
    border-radius: 10px;
    background-color: $background-color;
  }
  p {
    font-size: 15px;
  }
  .comment {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 5px;
    padding: 3px 0px 10px 0px;
    background-color: white;
    border-bottom: $border-color solid 1px;
  }
}
.comment_user,
.comment_text {
  margin: 0px;
}
.fa-times {
  color: lightgray;
  font-size: large;
  transition: cubic-bezier(0.2, 3, 0.4, 1) 0.4s;
}
</style>
