<template>
  <navBar />
  <div class="div_img">
    <img src="../assets/icon-above-font.png" alt="auth_img" class="auth_img" />
  </div>
  <div class="user_block">
    <div class="user_title">
      <h1>Mon compte</h1>
    </div>
    <div class="user_name">
      <h4>Prénom : {{ user.name }}</h4>
    </div>
    <div class="user_lastname">
      <h4>Nom : fdv{{ user.lastName }}</h4>
    </div>
    <div class="user_email">
      <h4>Adresse mail : {{ user.email }}</h4>
    </div>
    <div>
      <input
        class="user_deactivate"
        type="button"
        value="Désactiver compte"
        @click.prevent="deleteAccount()"
      />
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";

export default {
  name: "user",
  components: {
    navBar,
  },
  beforeCreate() {
    fetch(`http://localhost:3000/api/user/${localStorage.getItem("userId")}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.user = data;
      })
      .catch((err) => console.log(err));
  },
  data() {
    return {
      user: {},
      admin: localStorage.getItem("admin"),
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    deleteAccount() {
      fetch(
        `http://localhost:3000/api/user/${localStorage.getItem("userId")}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            alert("Votre compte a bien été supprimé, à bientôt 👋🏼");
            localStorage.clear();
            this.$router.push("/login");
          } else {
            alert("Erreur lors de la suppression de votre compte 😰");
          }
        })
        .catch((err) => console.log(err));
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

<style lang="scss" scoped>
@import "../style.scss";
.user_block {
  background: $background-color;
  border-radius: 50px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px $border-color;
  max-width: 70%;
  margin: auto;
  h1 {
    color: $font-color;
  }
}
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
.user_deactivate {
  @include auth-button;
  width: auto;
  margin-top: 15px;
  border-color: $font-color;
  background-color: $font-color;
  font-size: 18px;
}
</style>
