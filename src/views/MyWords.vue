<template>
  <div class="container cf7_custom_style_1" style="margin-top: 30px">
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-11">
        <a @click.prevent="new_word" class="button is-primary is-pulled-right"
          >Add New</a
        >
      </div>
    </div>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-11">
        <b-table
          :paginated="true"
          :per-page="5"
          :data="get_Data()"
          :columns="columns"
          :mobile-cards="true"
          :loading="loading"
        ></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ModalProgrammatic as Modal } from "buefy";
import NewWordComponent from "../components/NewWord";
import { mapActions, mapGetters } from "vuex";
import Axios from "axios";

export default {
  data: () => ({
    loading: false,
    columns: [
      {
        field: "word",
        label: "Word",
        searchable: true
      },
      {
        field: "definition",
        label: "Definition",
        searchable: true
      },
      {
        field: "category",
        label: "Category",
        searchable: true
      }
    ]
  }),
  methods: {
    ...mapActions(["append_Data", "set_Data"]),
    ...mapGetters(["get_Data"]),
    new_word() {
      Modal.open({
        component: NewWordComponent,
        parent: this,
        hasModalCard: true,
        trapFocus: true
      });
    }
  },
  created() {
    this.loading = true;
    Axios.get("/api/word", { withCredentials: true })
      .then(r => {
        this.set_Data(r.data.words);
        this.loading = false;
      })
      .catch(console.warn);
  }
};
</script>

<style scoped>
.cf7_custom_style_1 {
  margin-left: 2%;
  margin-right: 2%;
}
</style>
