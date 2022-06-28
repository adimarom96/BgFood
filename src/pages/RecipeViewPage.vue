<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <!-- <h1> {{this.state}} </h1> -->
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>number of dishes: {{ recipe.servings }}</div>
               <b-badge v-if="recipe.vegan" variant="success">vegan</b-badge>
          <b-badge v-if="recipe.vegetarian" variant="primary">vegetarian</b-badge>
           <b-badge v-if="recipe.glutenFree" variant="info">glutenFree</b-badge>
            </div>
            Ingredients:
            <ul >
            <span v-if="this.state === 'MyRecipes'">
            <li>
                {{ recipe.ingredients }}
              </li>
            </span>
            <span v-else>
            <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                {{ r.original }}
              </li>
            </span>
              
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol v-if="this.state != 'MyRecipes'">
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
            <ol v-else>
              {{ recipe.instructions }}
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      state: this.$route.params.state,
    };
  },
  mounted() {
   
    console.log(this.$route.params.recipeId);
    if (this.$route.params.state == "MyRecipes") {
      this.createdMyRecipe();
    } else {
      this.created();
    }
  },
  methods: {
    async createdMyRecipe() {
      // console.log(this.state);
      try {
        console.log("70:   ", this.$route.params.recipeId);
        const response = await this.axios.get(
          "http://localhost:3000/users/getMyrecipesWithId?recipe_id=" +
          this.$route.params.recipeId,
          { withCredentials: true }
        );

        console.log("data:   ", response.data);
        if (response.status !== 200) this.$router.replace("/NotFound");
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        this.recipe = this.recipes[0];
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async created() {
      // console.log(this.state);
      try {
        // response = this.$route.params.response;
        // try {
        // response = await this.axios.get(
        //   // "https://test-for-3-2.herokuapp.com/recipes/info",
        //   //this.$root.store.server_domain + "/recipes/info",
        //     "/recipes/",
        //   {
        //     params: { id: this.$route.params.recipeId },
        //   }
        // );
        const response = await this.axios.get(
          "http://localhost:3000/recipes/getFullRecipe?recipe_id=" +
          this.$route.params.recipeId,
          { withCredentials: true }
        );

        console.log("data:   ", response.data);
        if (response.status !== 200) this.$router.replace("/NotFound");
        // } catch (error) {
        //   console.log("error.response.status", error.response.status);
        //   this.$router.replace("/NotFound");
        //   return;
        // }
        console.log("line 82");
        let {
          analyzedInstructions,
          instructions,
          extendedIngredients,
          aggregateLikes,
          readyInMinutes,
          image,
          title,
          servings,
          vegan,
          vegetarian,
          glutenFree,
        } = response.data;

        console.log("line 92");

        let _instructions = analyzedInstructions
          .map((fstep) => {
            fstep.steps[0].step = fstep.name + fstep.steps[0].step;
            return fstep.steps;
          })
          .reduce((a, b) => [...a, ...b], []);
        console.log("line 92");
        let _recipe = {
          instructions,
          _instructions,
          analyzedInstructions,
          extendedIngredients,
          aggregateLikes,
          readyInMinutes,
          image,
          title,
          servings,
          vegan,
          vegetarian,
          glutenFree,
        };

        this.recipe = _recipe;
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.wrapped {
  width: 50%;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

/* .recipe-header{

} */
</style>
