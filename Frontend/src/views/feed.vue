<template>
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="menu">
    <navBar />
  </div>
  <div class="div_img">
    <img src="../assets/icon-above-font.png" alt="auth_img" class="auth_img" />
  </div>
  <div class="feed_content">
    <h2>Quoi de neuf ?</h2>
    <form class="feed_createpost">
      <textarea
        title="creer_post"
        class="feed_typetext"
        name="post_content"
        placeholder="Partagez avec la communauté"
        v-model="post_content"
      />
      <div class="feed_buttons">
        <input type="file" ref="file" accept="image/*" @change="add_img()" />
        <input
          type="submit"
          class="input_createpost"
          value="Publier"
          @click.prevent="createPost()"
        />
      </div>
    </form>
    <div class="feed_posts">
      <Post />
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import Post from "../components/post.vue";

export default {
  name: "feed",
  components: {
    navBar,
    Post,
  },
  data() {
    return {
      post_content: "",
      image: "",
    };
  },
  methods: {
    createPost() {
      let newPost = new FormData();
      newPost.append("post_content", this.post_content);
      newPost.append("image", this.file);
      newPost.append("userId", localStorage.getItem("userId"));

      if (this.post_content === "") {
        alert("Le contenu du post est vide, veuillez écrire quelque chose !");
      } else {
        fetch("http://localhost:3000/api/post/", {
          method: "POST",
          body: newPost,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res) => {
          res
            .json()
            .then((data) => {
              console.log(data);
              if (res.status === 201) {
                document.location.reload();
                this.$router.push("/feed");
              } else {
                alert("Erreur lors de la publication de votre post");
              }
            })
            .catch((error) => console.log(error));
        });
      }
    },
    add_img() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
.div_img {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;
  .auth_img {
    width: 200px;
  }
}
.feed_posts {
  width: 60%;
  margin-top: 30px;
}
.feed_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $background-color;
  color: $font-color;
  border: solid 2px $border-color;
  border-radius: 40px;
  padding: 10px;
  max-width: 70%;
  margin: 0px auto 30px auto;
  .feed_createpost {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  .feed_typetext {
    width: 90%;
    max-width: 90%;
    border: solid 3px $border-color;
    border-radius: 10px;
  }
  .feed_buttons {
    display: flex;
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .input_createpost {
    @include feed_button;
  }
}
.lds-ring {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  animation: fadein 2s forwards;
}
@keyframes fadein {
  0% {
    z-index: 10000;
    background: rgba(255, 255, 255, 1);
  }
  20% {
    background: rgba(255, 255, 255, 0.8);
  }
  40% {
    background: rgba(255, 255, 255, 0.6);
  }
  60% {
    background: rgba(255, 255, 255, 0.4);
  }
  80% {
    background: rgba(255, 255, 255, 0.2);
  }
  100% {
    background: rgba(255, 255, 255, 0.2);
    visibility: hidden;
  }
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 8px;
  border: 8px solid $font-color;
  border-radius: 50%;
  border-color: $font-color transparent transparent transparent;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    visibility: hidden;
  }
}
@media screen and (max-width: 700px) {
  .feed_posts {
    width: 90%;
  }
}
</style>
