<template>
  <section style="margin-top: 30px">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card cf7_custom_style_1">
          <div class="card-content">
            <p class="title is-4">Enter Login Credentials</p>
          </div>
          <div class="card-content">
            <b-field label="Email">
              <b-input v-model="email"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input
                type="password"
                v-model="password"
                password-reveal
              ></b-input>
            </b-field>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <router-link
                class="is-primary"
                :to="{ name: 'reset-password', params: { email } }"
                >Forgot Password</router-link
              >
            </div>
            <div class="card-footer-item">
              <a @click.prevent="login">Login</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from "axios";
import { mapActions } from "vuex";
import { createHash } from "crypto";
import { SnackbarProgrammatic as Snackbar } from "buefy";
export default {
  data: () => ({ email: "", password: "" }),
  methods: {
    ...mapActions(["set_Login"]),
    async login() {
      try {
        let data = {
          password: createHash("sha256")
            .update(this.password)
            .digest("base64"),
          email: this.email
        };
        let r = await Axios.post("/api/user/login", data, {
          withCredentials: true
        });
        Snackbar.open({
          message: r.data.message,
          type: "is-white",
          actionText: " ",
          position: "is-bottom-right"
        });
        if (r.data.success) {
          this.set_Login(true);
          this.$router.push({ name: "my-words" });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  },
  created() {
    Axios.get("/api/user/login", {
      withCredentials: true
    }).then(r => {
      this.set_Login(r.data.status);
      if (r.data.status) {
        this.$router.push({ name: "my-words" });
      }
    });
  }
};
</script>

<style scoped>
@media only screen and (max-width: 770px) {
  .cf7_custom_style_1 {
    margin-left: 2%;
    margin-right: 2%;
  }
}

@media only screen and (min-width: 770px) {
  .cf7_custom_style_1 {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
