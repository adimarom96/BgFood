<template>
  <div id="app">
    <div>
      <b-navbar class="menu" toggleable="lg">
        <b-navbar-brand class="navbar-brand">
          <img class="navbar-logo" src="../src/assets/logo1.jpeg" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link :to="{ name: 'main' }">
                Main
              </router-link>
            </b-nav-item>

            <b-nav-item class="navSearch">
              <router-link :to="{ name: 'search' }">Search</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'about' }">About</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <div v-if="!$root.store.username">
              <b-nav-item class="navHG">
                Hello Guest
              </b-nav-item>
              <b-nav-item class="navR">
                <router-link :to="{ name: 'register' }">Register</router-link>
              </b-nav-item>
              <b-nav-item class="navL">
                <router-link :to="{ name: 'login' }"> Login </router-link>
              </b-nav-item>
            </div>
            <div v-else>
              <b-nav-item class="navWA">
                welcome {{ $root.store.username }}
              </b-nav-item>

              <b-nav-item-dropdown
                class="dropdownNav"
                right
                text="User"
                v-if="$root.store.username"
              >
                <b-dropdown-item>
                  <router-link :to="{ name: 'myRecipes' }"
                    >My Recipes</router-link
                  >
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link :to="{ name: 'familyRecpies' }"
                    >My Family Recpies</router-link
                  >
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link :to="{ name: 'favorites' }"
                    >My Favorites</router-link
                  >
                </b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item class="logoutNav">
                <div @click="Logout">Logout</div>
              </b-nav-item>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- ..\src\assets\background1.jpg -->
    <div class="nav" id="nav">
      <!-- <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'favorites' }">Favorites</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <router-link :to="{ name: 'myRecipes' }">myRecipes</router-link>|
      <router-link :to="{ name: 'familyRecpies' }">familyRecpies</router-link>| -->
      <!--{{ !$root.store.username }}-->
      <!-- <span v-if="!$root.store.username">
        Hello Guest|
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }} <button @click="Logout">Logout</button>|
      </span> -->
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
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");
#app {
  background-image: "url(https://vuejs.org/images/logo.png)";
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.navbar-logo {
  width: 15%;
  border-radius: 50%;
}
.navbar-brand {
  margin-right: -20rem;
}
.menu {
  color: white;
  background-color: #1b1b19 !important;
  height: 60px;
}

.navbar-light .navbar-nav .nav-link {
  color: rgb(255, 248, 248) !important;
  display: flex !important;
}
a.nav-link {
  padding-left: 10% !important;
  //color: white !important;
}

.navHG {
  display: inline-block;
  width: 100px;
}

.navR {
  display: inline-block;
  margin: 0 10px;
}

.navL {
  display: inline-block;
  margin-right: 15px;
}

.dropdownNav {
  display: inline-block;
  margin: 0 10px;
}

.logoutNav {
  display: inline-block;
}
.navWA {
  display: inline-block;
  width: 155px;
}

.dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  margin-top: 10px;
}

.navSearch {
  margin: 0 20px;
}

a {
  //color: white !important;
  text-decoration: none;
  background-color: transparent;
  //padding: 3px 12px !important;
}

a:hover {
  text-decoration: none !important;
  border-radius: 3px;
}

.navSearch:hover {
  margin: 0 20px;
}

a.nav-link {
  padding: 3px 10px !important;
}

ul.navbar-nav {
  margin: 0 AUTO;
}

ul#__BVID__15__BV_toggle_menu_ {
  background-color: #1b1b19;
  //border: 1px solid white;
}

a.dropdown-item {
  background-color: #1b1b19 !important;
}

li.nav-item:hover {
  text-decoration: none !important;
  background-color: orange;
  border-radius: 3px;
}

.navWA:hover {
  background-color: #1b1b19 !important;
}
</style>
