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
      default:
        console.log(" switch case defult");
    }
  },
  methods: {
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
      console.log("adsadasd");
      const response = await this.axios.get(
        "http://localhost:3000/recipes/getLast3"
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
