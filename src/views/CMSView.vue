<template>
  <div>
    <nav>
      <router-link to="/cms/categories">Categories</router-link> |
      <router-link to="/">News</router-link>
      <router-link v-if="user.role === 'ADMIN'" to="/users">Users</router-link>
    </nav>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      user: this.getUser()
    };
  },
  methods: {
    getUser() {
      const token = localStorage.getItem('jwt');
      if (token) {
        return jwt_decode(token);
      } else {
        return {};
      }
    }
  }
};
</script>
