<template>
  <div class="div_img">
    <img src="../assets/icon-above-font.png" alt="auth_img" class="auth_img" />
  </div>
  <div class="auth_block">
    <div class="auth_title">
      <h2>Bienvenue !</h2>
      <h3>Je me connecte à mon compte</h3>
      <router-link to="/signup"><h5>Je n'ai pas de compte</h5></router-link>
    </div>
    <form>
      <label
        >Email <input type="text" placeholder="Email" v-model="email"
      /></label>
      <label
        >Mot de passe
        <input type="password" placeholder="Mot de passe" v-model="password"
      /></label>
      <input
        class="input_login"
        type="submit"
        value="Se connecter"
        @click.prevent="login()"
      />
      <p id="error">{{ formErr }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "loginContent",
  data() {
    return {
      email: "",
      password: "",
      formErr: null,
    };
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      if (this.email === "" || this.password === "") {
        return (this.formErr = "Veuillez remplir les champs vides ! ");
      } else {
        fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        })
          .then((res) => {
            res.json().then((data) => {
              if (res.status === 200) {
                let token = data.token;
                let userId = data.userId;
                localStorage.setItem("token", token);
                localStorage.setItem("userId", JSON.stringify(userId));
                localStorage.setItem("isAdmin", data.admin);
                this.$router.push("/feed");
              } else {
                return (this.formErr =
                  "L'adresse email et/ou le mot de passe renseignés sont incorrects");
              }
            });
          })
          .catch(() => {
            localStorage.clear();
            return (this.formErr = "Erreur lors de la connexion");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
.auth_block {
  background: $background-color;
  border-radius: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: solid 2px $border-color;
  max-width: 70%;
  margin: auto;
  .auth_title {
    display: flex;
    color: $font-color;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    margin-top: 15px;
  }
  h3 {
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: 400;
  }
  h5 {
    margin-bottom: 5px;
    margin-top: 10px;
  }
  .input_login {
    @include auth-button;
  }
  a {
    color: $font-color;
  }
  #error {
    font-weight: 700;
    color: $font-color;
    text-align: center;
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
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
  input {
    border: solid 3px $border-color;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 90%;
    height: 30px;
  }
}
@media screen and (max-width: 387px) {
  .auth_title {
    h3 {
      text-align: center;
    }
  }
}
label {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80%;
  padding: 5px;
  color: $font-color;
  font-weight: 600;
  font-size: 18px;
}
</style>
