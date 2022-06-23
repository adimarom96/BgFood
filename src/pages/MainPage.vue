<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <router-link v-if="!$root.store.username" to="/login" tag="button"
      >You need to Login to vue this</router-link
    >
    <RecipePreviewList
      :key="componentKey"
      title="Randome Recipes"
      state="random"
      class="RandomRecipes center"
    />
    <b-button variant="outline-primary" @click="Random()"
      >Random Recipes</b-button
    >
    <RecipePreviewList
      title="Last Viewed Recipes"
      state="last3"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true,
      }"
      disabled
    ></RecipePreviewList>

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

export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  components: {
    RecipePreviewList,
  },
  methods: {
    async Random() {
      this.componentKey += 1;
      console.log("adi");
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
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
