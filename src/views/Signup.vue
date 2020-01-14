<template>
  <section style="margin-top: 30px">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card cf7_custom_style_1">
          <div class="card-content">
            <p class="title is-4">Enter Login Credentials</p>
          </div>
          <div class="card-content">
            <b-field label="Name">
              <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="Email">
              <b-input v-model="email"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                v-model="password"
                password-reveal
                type="password"
              ></b-input>
            </b-field>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <a @click.prevent="signup" class="is-primary">Signup</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from "axios";
import { createHash } from "crypto";
import { SnackbarProgrammatic as Snackbar } from "buefy";
import { mapActions } from "vuex";
export default {
  data: () => ({ password: "", email: "", name: "" }),
  methods: {
    ...mapActions(["set_Login"]),
    async signup() {
      // return;
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: createHash("sha256")
            .update(this.password)
            .digest("base64")
        };
        let r = await Axios.post(
          "http://localhost:3000/api/user/register",
          data,
          { withCredentials: true }
        );
        if (r.data.success) {
          this.$router.push({ name: "login" });
        }
        Snackbar.open({
          message: r.data.message,
          type: "is-white",
          actionText: " ",
          position: "is-bottom-right"
        });
      } catch (error) {
        console.warn(error);
      }
    }
  },
  created() {
    Axios.get("http://localhost:3000/api/user/login", {
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
