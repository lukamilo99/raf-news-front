<template>
  <div id="app">
    <div class="text-center mt-5">
      <h1>Content Management System</h1>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-6">
          <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
            <h5>Categories</h5>
            <router-link class="btn btn-primary" to="/cms/categories">Go</router-link>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
            <h5>News</h5>
            <router-link class="btn btn-primary" to="/cms/news">Go</router-link>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2" v-if="user.role === 'ADMIN'">
            <h5>Users</h5>
            <router-link class="btn btn-primary" to="/cms/users">Go</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-primary" @click="logout">Logout</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  computed: {
    user() {
      const token = localStorage.getItem('jwt');
      if (token) {
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
