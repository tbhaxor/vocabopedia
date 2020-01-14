<template>
  <div class="container" style="margin-top: 30px">
    <div class="columns">
      <div class="column is-two-thirds is-offset-one-fifth">
        <div class="card cf7_custom_style_1">
          <div class="card-content">
            <div class="title is-4">
              <h1>Your Profile</h1>
            </div>
          </div>
          <div class="card-content">
            <b-field label="Name">
              <b-input type="text" v-model="name"></b-input>
            </b-field>
            <b-field label="Email">
              <b-input
                type="email"
                class="is-disabled"
                disabled
                v-model="email"
              ></b-input>
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
              <a @click.prevent="save">Save</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { createHash } from "crypto";
import { SnackbarProgrammatic } from "buefy";
export default {
  data: () => ({ name: "", email: "", password: "" }),
  methods: {
    async save() {
      let data = { name: this.name };
      if (this.password) {
        data.password = createHash("sha256")
          .update(this.password)
          .digest("base64");
      }
      let r = await Axios.put("/api/user/profile", data, {
        withCredentials: true
      });

      SnackbarProgrammatic.open({
        message: r.data.message,
        actionText: " ",
        type: "is-dark",
        position: "is-bottom-right"
      });
    }
  },
  created() {
    Axios.get("/api/user/profile", {
      withCredentials: true
    })
      .then(r => {
        this.name = r.data.profile.name;
        this.email = r.data.profile.email;
      })
      .catch(console.warn);
  }
};
</script>

<style>
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
