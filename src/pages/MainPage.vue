<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <router-link v-if="!$root.store.username" to="/login" tag="button"
      >You need to Login to vue this</router-link
    >
    <div class="recipe">
      <RecipePreviewList
        :key="componentKey"
        title="Randome Recipes"
        state="random"
        class="RandomRecipes center"
      />
    </div>
    <b-button variant="outline-primary" @click="Random()"
      >Random Recipes</b-button
    >
    <RecipePreviewList
      v-if="$root.store.username"
      title="Last Viewed Recipes"
      state="last3"
      :class="{
        RandomRecipes: true,
        center: true,
      }"
      disabled
    ></RecipePreviewList>
    <div class="login">
      <LoginPage></LoginPage>
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import { async } from "q";
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";

export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  components: {
    RecipePreviewList,
    LoginPage,
  },
  methods: {
    async Random() {
      this.componentKey += 1;
      console.log("Random call");
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
  display: inline-block;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
