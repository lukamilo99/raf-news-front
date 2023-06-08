<template>
  <div>
    <h1>Category</h1>
    <div v-for="news in newsList" :key="news.id" class="news-item">
      <router-link :to="`/news-platform/news/${news.id}`">
        <h2>{{ news.title }}</h2>
      </router-link>
      <p>{{ news.content }}</p>
      <p>Category: {{ news.category }}</p>
      <p>Published at: {{ news.creationDate }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newsList: [],
    };
  },
  methods: {
    fetchNews() {
      axios.get(`http://localhost:8082/api/news/category/${this.$route.params.categoryId}`)
          .then(response => {
            this.newsList = response.data;
            this.newsList.forEach(item => {
              const date = new Date(item.creationDate);
              item.creationDate = date.toLocaleDateString();
            });
            console.log(this.newsList);
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  created() {
    this.fetchNews();
  },
};
</script>