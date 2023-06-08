<template>
  <nav>
    <router-link to="/news-platform/home">Home</router-link> |
    <router-link to="/news-platform/trending">Trending</router-link>
    <br/>
    <br/>
    <span v-for="(category, index) in categories" :key="category.id">
      <router-link :to="`/news-platform/category/${category.id}`">{{ category.name }}</router-link><span v-if="index < categories.length - 1"> | </span>
    </span>
  </nav>
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
    axios.get('http://localhost:8082/api/category/all')
        .then(response => {
          this.categories = response.data;
        });
  },
};
</script>
