<template>
  <div>
    <nav>
      <router-link to="/cms/categories">Categories</router-link> |
      <router-link to="/cms/news">News</router-link> |
      <router-link v-if="user.role === 'ADMIN'" to="/cms/users">Users</router-link>
      <button @click="logout">Logout</button>
    </nav>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  computed: {
    user() {
      const token = localStorage.getItem('jwt');
      if (token) {
        console.log(jwt_decode(token))
        return jwt_decode(token);
      } else {
        return {};
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push('/login');
    }
  }
};
</script>
