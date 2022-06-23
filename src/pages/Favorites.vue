<template>
  <div class="container">
  <h1> Favorites</h1>
    <RecipePreviewList
      title="Favorites"
      state="favorites"
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
    return {};
  },
};
</script>

<style></style>
