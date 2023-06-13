<template>
  <div id="app">
    <div class="text-center mt-5">
      <h1>News Platform</h1>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-6">
          <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
            <h5>Home</h5>
            <router-link class="btn btn-primary" to="/news-platform/home">Go</router-link>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
            <h5>Trending</h5>
            <router-link class="btn btn-primary" to="/news-platform/trending">Go</router-link>
          </div>
          <div class="mt-5">
            <h3>Categories:</h3>
            <div v-for="(category) in categories" :key="category.id" class="mt-3">
              <h5><router-link :to="`/news-platform/category/${category.id}`">{{ category.name }}</router-link></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    axios.get('http://localhost:8082/api/category/public/all')
        .then(response => {
          this.categories = response.data;
        });
  },
};
</script>
