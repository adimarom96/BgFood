<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    recipeskeywords: {
      type: String,
      required: false,
    },
    cuisine: {
      type: String,
      required: false,
    },
    intolerances: {
      type: String,
      required: false,
    },
    diet: {
      type: String,
      required: false,
    },
    num: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    switch (this.state) {
      case "random":
        this.randomRecipes();
        break;
      case "last3":
        this.lastRecipes();
        break;
      case "search":
        this.onSearch();
      case "favorites":
        this.onFavorites();
      default:
        console.log(" switch case defult -------->", this.state);
    }
  },
  methods: {
    async onFavorites() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getfavorites"
          //this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },

    async onSearch() {
      try {
        console.log("on search");

        if (this.recipeskeywords == "") {
          console.log("quey is null");
          return;
        }
        console.log(" query is : ", this.recipeskeywords);
        const response = await this.axios.get(
          "http://localhost:3000/recipes/search",
          {
            params: {
              recipeskeywords: this.recipeskeywords,
              cuisine: this.cuisine,
              intolerances: this.intolerances,
              diet: this.diet,
              num: this.num,
            },
          }
        );

        console.log("on search , respones : ", response);
        // this.$root.loggedIn = true;

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        this.$forceUpdate();
        console.log("after force update");
        console.log(this.recipes);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    async randomRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/recipes/random"
          //this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async lastRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/recipes/getLast3",{withCredentials : true}
          //this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
