<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Add New Word</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Word">
        <b-input v-model="word" placeholder="Enter word here..."></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot is-right">
      <a @click="setIt" :class="classes">Submit</a>
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Axios from "axios";
import { SnackbarProgrammatic } from "buefy";

export default {
  methods: {
    ...mapActions(["prepend_Data"]),
    async setIt() {
      if (!this.word) return;
      try {
        this.classes["is-loading"] = true;
        let r = await Axios.post(
          "/api/word",
          { word: this.word },
          { withCredentials: true }
        );
        this.classes["is-loading"] = false;
        if (r.data.success) {
          this.prepend_Data(r.data.data);
          this.$parent.close();
        }
        SnackbarProgrammatic.open({
          message: r.data.message,
          type: "is-dark",
          position: "is-bottom-right",
          actionText: " "
        });
      } catch (error) {
        console.warn(error);
      }
    }
  },
  data: () => ({
    word: "",
    classes: {
      button: true,
      "is-loading": false,
      "is-primary": true,
      "is-pulled-right": true
    }
  }),
  created() {}
};
</script>

<style></style>
