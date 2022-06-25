<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Adi & Ohad </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              ><router-link :to="{ name: 'main' }"
                >Vue Recipes</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link :to="{ name: 'search' }"
                >Search</router-link
              ></b-nav-item
            >
            <b-nav-item>
              <router-link :to="{ name: 'about' }"
                >About</router-link
              ></b-nav-item
            >
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <span v-if="!$root.store.username">
                Hello Guest
                <router-link :to="{ name: 'register' }"> Register </router-link>
                <router-link :to="{ name: 'login' }"> Login </router-link>
              </span>

              <span v-else>
                {{ $root.store.username }}
                <button @click="Logout">Logout</button>
              </span>
            </b-nav-item>

            <b-nav-item-dropdown right text="User">
              <b-dropdown-item
                ><router-link :to="{ name: 'myRecipes' }"
                  >myRecipes</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item
                ><router-link :to="{ name: 'familyRecpies' }"
                  >familyRecpies</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item
                ><router-link :to="{ name: 'favorites' }"
                  >Favorites</router-link
                ></b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'favorites' }">Favorites</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <router-link :to="{ name: 'myRecipes' }">myRecipes</router-link>|
      <router-link :to="{ name: 'familyRecpies' }">familyRecpies</router-link>|
      <!--{{ !$root.store.username }}-->
      <span v-if="!$root.store.username">
        Hello Guest|
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }} <button @click="Logout">Logout</button>|
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
