<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit="onSearch">
      <b-form-group id="input-group-search" label="search:" label-for="search">
        <b-form-input
          id="search"
          v-model="form.recipeskeyword"
          placeholder="Enter your query here"
          type="search"
          required
        ></b-form-input>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form-group>
    </b-form>

    <RecipePreviewList
      title="Search Result"
      state="random"
      class="RandomRecipes center"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      form: {
        search: "",
      },
    };
  },
  methods: {
    async onSearch() {
      try {
        console.log(this.form.recipeskeyword);
        const response = await this.axios.get(
          "http://localhost:3000/recipes/search",
          { params: { recipeskeyword: this.form.recipeskeyword } }
        );

        console.log(response);
        // this.$root.loggedIn = true;

        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
  },
};
</script>

<style></style>
