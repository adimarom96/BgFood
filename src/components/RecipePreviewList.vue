<template>
  <b-container>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
       
        <RecipePreview class="recipePreview" :recipe="r" :state=state />
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
    sortBy: {
      tpye: String,
      required: false,
    },
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
        break;
      case "favorites":
        this.onFavorites();
        break;
      case "MyRecipes":
        this.onMyRecipes();
        break;
      case "Family":
        this.onFamily();
        break;
      default:
        console.log(" switch case defult -------->", this.state);
    }
  },
  methods: {
    async onFavorites() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getfavorites",
          { withCredentials: true }
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
        console.log("sort = ", this.sortBy);
        if (this.recipeskeywords == "") {
          console.log("quey is null");
          return;
        }
        console.log(" query is : ", this.recipeskeywords);
        const response = await this.axios.get(
          `http://localhost:3000/recipes/search?recipeskeywords=${this.recipeskeywords}&num=${this.num}&cuisine=${this.cuisine}&intolerances=${this.intolerances}&diet=${this.diet}`,
          { withCredentials: true }
        );
        console.log("on search , respones : ", response);
        // this.$root.loggedIn = true;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log("on search 115, sort = ", this.sortBy);
        switch (this.sortBy) {
          case "readyInMinutes":
            console.log("in readyInMinutes ");
            this.recipes.sort(function (a, b) {
              return a.readyInMinutes - b.readyInMinutes;
            });
            break;
          case "aggregateLikes":
            this.recipes.sort(function (a, b) {
              return a.aggregateLikes - b.aggregateLikes;
            });
            break;
          default:
        }

        console.log("after swich case");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    async onMyRecipes() {
      console.log("in My Recipes in RecipePreviewList");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getMyrecipes"
        );
        console.log("response12: ", response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log("answer of MyRecpies: ", this.recipes);
      } catch (error) {
        console.log("error: ", error.response.data);
      }
    },

    // async randomRecipes() {
    //   try {
    //     const response = await this.axios.get(
    //       "http://localhost:3000/recipes/random",
    //       { withCredentials: true }
    //       //this.$root.store.server_domain + "/recipes/random",
    //       //"https://test-for-3-2.herokuapp.com/recipes/random"
    //     );

    //     console.log("respone in preview lsit ", response);
    //     const recipes = response.data;
    //     this.recipes = [];
    //     this.recipes.push(...recipes);
    //     console.log(this.recipes);
    //   } catch (error) {
    //     console.log(error.response.data);
    //   }
    // },
    async onFamily() {
      console.log("on Family");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/getFamily",
          { withCredentials: true }
        );
        console.log("res11: ", response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (err) {
        console.log("err:", err);
      }
    },
    // async lastRecipes() {
    //   try {
    //     const response = await this.axios.get(
    //       "http://localhost:3000/recipes/getLast3",
    //       { withCredentials: true }
    //       //this.$root.store.server_domain + "/recipes/random",
    //       // "https://test-for-3-2.herokuapp.com/recipes/random"
    //     );

    //     console.log("last 3 response: ",response);
    //     const recipes = response.data;
    //     this.recipes = [];
    //     this.recipes.push(...recipes);
    //     console.log(this.recipes);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
