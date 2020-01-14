<template>
  <div>
    <template>
      <b-navbar type="is-dark">
        <template slot="brand">
          <b-navbar-item
            style="font-family: Sofia; font-size: 25px"
            exact-active-class="is-active"
            tag="router-link"
            :to="{ name: 'home' }"
            >Vocabopedia</b-navbar-item
          >
        </template>

        <template slot="end">
          <b-navbar-item tag="div">
            <b-dropdown
              aria-role="list"
              position="is-bottom-left"
              v-show="get_Login()"
            >
              <button class="button is-dark" slot="trigger">
                <span>My Account</span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item has-link aria-role="menuitem">
                <router-link
                  exact-active-class="is-active"
                  :to="{ name: 'my-words' }"
                  >My Words</router-link
                >
              </b-dropdown-item>
              <b-dropdown-item
                has-link
                exact-active-class="is-active"
                aria-role="listitem"
              >
                <router-link
                  exact-active-class="is-active"
                  :to="{ name: 'settings' }"
                  >Settings</router-link
                >
              </b-dropdown-item>
              <hr class="dropdown-divider" aria-role="menuitem" />
              <b-dropdown-item aria-role="listitem" @click="logout"
                >Logout</b-dropdown-item
              >
            </b-dropdown>
            <div class="buttons" v-show="!get_Login()">
              <router-link class="button is-primary" :to="{ name: 'signup' }">
                <strong>Sign up</strong>
              </router-link>
              <router-link class="button is-light" :to="{ name: 'login' }"
                >Log in</router-link
              >
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </template>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Axios from "axios";
export default {
  methods: {
    ...mapActions(["set_Login"]),
    ...mapGetters(["get_Login"]),
    async logout() {
      Axios.delete("http://localhost:3000/api/user/login", {
        withCredentials: true
      })
        .then(() => {
          this.set_Login(false);
          this.$router.push({ name: "login" });
        })
        .catch(console.warn);
    }
  },
  created() {
    Axios.get("http://localhost:3000/api/user/login", {
      withCredentials: true
    })
      .then(r => {
        this.set_Login(r.data.status);
      })
      .catch(console.warn);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Sofia");
button::-moz-focus-inner,
a::-moz-focus-inner {
  border: 0;
}
</style>
