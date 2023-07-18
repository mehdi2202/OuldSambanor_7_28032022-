<template>
  <div class="comment_block">
    <div class="comment_content"></div>
    <div class="comment">
      <span>
        <h4 class="comment_user">
          {{ comment.User.firstName }} {{ comment.User.name }}
        </h4>
        <p class="comment_text">{{ comment.comment_content }}</p>
      </span>
      <button
        class="post_button"
        @click="deleteComment(comment)"
        v-if="comment.User.id == userId || isAdmin == 'true'"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
  props: ["comment"],
  data() {
    return {
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  methods: {
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
  },
};
</script>
