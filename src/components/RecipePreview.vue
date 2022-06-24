<template>
  <div>
    <router-link
      :to="{
        name: 'recipe',
        params: { recipeId: recipe.id },
      }"
      class="recipe-preview"
    >
      <!-- <router-link
      :to="{
        path: '/recipes/getFullRecipe/',
        query: { recipe_id: recipe.id },
      }"
    > -->
      <div class="recipe-body">
        <img v-if="image_load" :src="recipe.image" class="recipe-image" />
      </div>
    </router-link>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.popularity }} likes</li>
        <li>Watched?
        <button disabled v-if="recipe.seen === false" type="button">
            <b-icon icon="Eye-fill"></b-icon>
          </button>
          <button disabled v-else type="button">
          seen!
            <b-icon icon="Eye"></b-icon>
          </button>
        </li>
        <li>Favorite?
          <button v-if="recipe.favorite === false" type="button" @click="like(recipe.id).prevent">
            <b-icon icon="heart"></b-icon>
          </button>
          <button v-else type="button" @click="like(recipe.id).prevent">
            <b-icon icon="heart-fill"></b-icon>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
    };
  },
  methods: {
    async like() {
      try {
        console.log("in fav", this.recipe.id);
        this.recipe.favorite = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/addfavorites?recipeid="+this.recipe.id
          ,{ withCredentials: true },
          // {
          //   params: {
          //     recipeid: this.recipe.id,
          //   },
          // }
        );

        console.log(response);
        this.$forceUpdate();
        // this.$root.loggedIn = true;
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}

.recipe-preview>.recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
