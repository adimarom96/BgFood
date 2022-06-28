<template>
  <div>
    <b-card no-body >
      <router-link
        :to="{
          name: 'recipe',
          params: { recipeId: recipe.id, state: this.state },
        }"
        class="recipe-preview"
      >
        <b-card :title="recipe.title" :img-src="recipe.image" class="inner" />
      </router-link>
      <b-card-body >
        <b-card-text>
          <!-- state is :{{ state }} recpies is : {{ recipe.id }} or {{ recipe.id }} -->
          <ul class="recipe-overview">
            <li>{{ recipe.readyInMinutes }} minutes</li>
            <li>{{ recipe.aggregateLikes }} likes</li>
            <span v-if="$root.store.username">
          <div v-if="recipe.favorite === false">
           <li> add to faviorte
            <b-icon icon="star" @click="like(recipe.id).prevent"></b-icon>
            </li>
          </div>
          <div v-else type="button" @click="like(recipe.id).prevent">
            <li><b-icon icon="star-fill"></b-icon></li>
            </div>

           <li> <b-icon v-if="recipe.seen === false" icon="Eye"></b-icon>
            <b-icon v-else icon="Eye-fill"></b-icon>
            </li>
          </span>
          </ul>
          <ul>
          <div>
           <b-badge v-if="recipe.vegan" variant="success">vegan</b-badge>
          <b-badge v-if="recipe.vegetarian" variant="primary">vegetarian</b-badge>
           <b-badge v-if="recipe.glutenFree" variant="info">glutenFree</b-badge>
         
         </div>
          </ul>

        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
export default {

  data() {
    return {
     
    };
  },

  methods: {
    async like() {
      try {
        console.log("in fav", this.recipe.id);
        this.recipe.favorite = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/addfavorites?recipeid=" + this.recipe.id,
          { withCredentials: true }
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
    state: {
      tpye: String,
      required: false,
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

.recipe-preview > .recipe-body {
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
.inner{
  border: none;
  
}
.card-body {
    padding: 3px;
}
h4{
  font-size: 14pt !important;
}
</style>
