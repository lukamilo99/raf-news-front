<template>
  <div class="container">
    <h1 class="my-4">Home Page</h1>
    <div class="row">
      <div class="col-md-6 col-lg-4 mb-4" v-for="news in newsList" :key="news.id">
        <div class="card">
          <div class="card-body">
            <router-link :to="`/news-platform/news/${news.id}`">
              <h2 class="card-title">{{ news.title }}</h2>
            </router-link>
            <p class="card-text">{{ news.content }}</p>
            <p class="text-muted">Author: {{ news.author }}</p>
            <p class="text-muted">Category: {{ news.category }}</p>
            <p class="text-muted">Published at: {{ news.creationDate }}</p>
          </div>
        </div>
      </div>
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
      axios.get('http://localhost:8082/api/news/public/latest')
          .then(response => {
            this.newsList = response.data;
            this.newsList = this.newsList.map(item => {
              const date = new Date(item.creationDate);
              return { ...item, creationDate: date.toDateString() };
            });
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