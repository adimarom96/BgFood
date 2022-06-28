<template>


<div class="container">
  <h1 class="title">Main Page</h1>
    <div class="left">
      <h2 class="title">Explore this recipes</h2>
        <RecipePreviewList
          :key="componentKey"
          title="Randome Recipes"
          state="random"
          class="RandomRecipes"
        />
      
      <b-button variant="outline-primary" @click="Random()"
        >Random Recipes</b-button
      >
    </div>

    <div class="right1">
        <div class="login" v-if="!$root.store.username" >
          <LoginPage></LoginPage>
        </div>
        <div v-else>
        <h2 class="title">Last Seen </h2>
            <RecipePreviewList
          v-if="$root.store.username"
          title="Last Viewed Recipes"
          state="last3"
          class="RandomRecipes"
        ></RecipePreviewList>
        </div>
    </div>
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
.container{
  width: 100%;
  margin: 0 auto;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.title{
    text-align: center;
}

.left{
  width: 50%;
    display: inline-block;
    float: left;
}

.right1{
  width: 50%;
    display: inline-block;
}
</style>
