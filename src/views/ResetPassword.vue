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
              <b-input v-model="x"></b-input>
            </b-field>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <a @click.prevent="send_password" class="is-primary"
                >Send Password</a
              >
            </div>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from "axios";
import { SnackbarProgrammatic } from "buefy";
export default {
  props: ["email"],
  data: () => ({ x: "" }),
  methods: {
    async send_password() {
      Axios.post(
        "/api/user/forgot-password",
        { email: this.x },
        { withCredentials: true }
      )
        .then(r => {
          SnackbarProgrammatic.open({
            position: "is-bottom-right",
            actionText: " ",
            message: r.data.message,
            type: "is-dark"
          });
        })
        .catch(console.warn);
    }
  },
  created() {
    if (this.email) this.x = this.email;
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
