<template>
  <div class="container">
  <h1> Favorites</h1>
    <RecipePreviewList
      v-if="this.clicked"
      title="Favorites"
      state="favorites"
      class="RandomRecipes center"
    />
  </div>
</template>