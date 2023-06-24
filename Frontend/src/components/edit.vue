<template>
  <div class="post_block" v-for="post in posts" :key="post.id">
    <div class="post_content">
      <p class="post_text">{{ post.post_content }}</p>
      <p class="post_img">
        <img :src="post.image" alt="" v-if="post.image != null" />
      </p>
    </div>
    <div class="post_icon">
      <button
        id="update"
        class="post_button update_button"
        v-if="post.UserId == userId || isAdmin == 'true'"
        @click.prevent="updatePost(post)"
      >
        Confirmer
        <i class="fa fa-check-square-o"></i>
      </button>
      <button
        id="cancel"
        class="post_button delete_button"
        v-if="post.UserId == userId || isAdmin == 'true'"
        @click.prevent="deletePost(post)"
      >
        Annuler
        <i class="fa fa-window-close"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditPost",
  components: {},
  data() {
    return {
      post_content: "",
      image: "",
    };
  },
  methods: {
    updatePost() {
      if (confirm("Voulez vous modifier ce post ? ")) {
        // document.querySelector("#delete")= "Confirmer";
        // document.querySelector("#delete")="Annuler";
        // const cancelButton = document.querySelector("#delete");

        // let cancel_button = document.querySelector("#delete");
        // const initial = document.getElementsByClassName("post_icon");
        // const initialText = initial.textContent;

        const update_button = document.querySelector("#update");

        function update() {
          if (this.post_content === "") {
            alert(
              "Le contenu du post est vide, veuillez écrire quelque chose !"
            );
          } else {
            let config = {
              method: "put",
              url: `http://localhost:3000/api/post/${post.id}`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            };
            axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.status === 201) {
                  document.location.reload();
                  this.$router.push("feed");
                }
              })
              .catch(function (response) {
                if (response.status >= 400) {
                  alert("Erreur lors de la publication du post");
                }
              });
          }
        }
        update_button.addEventListener("click", update);
      } else {
        const cancelButton = document.querySelector("#cancel");
        function reload() {
          document.location.reload();
          this.$router.push("/feed");
        }
        function cancelFunction() {
          cancelButton.addEventListener("click", reload);
        }
        cancelFunction();
      }
    },
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

.fa-window-close {
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
