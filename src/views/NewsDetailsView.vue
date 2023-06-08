<template>
  <div>
    <h1>{{ news.title }}</h1>
    <p>{{ news.content }}</p>
    <p>Published at: {{ formatDate(news.creationDate) }}</p>
    <p>Author: {{ news.author }}</p>

    <div v-for="tag in news.tags" :key="tag.id">
      <router-link :to="`/tag/${tag}`">{{ tag.name }}</router-link>
    </div>

    <h2>Comments</h2>

    <form @submit.prevent="submitComment">
      <textarea v-model="commentToSend.content" placeholder="Your Comment" required></textarea>
      <button type="submit">Submit</button>
    </form>

    <div v-for="comment in news.comments" :key="comment.id">
      <p>{{ comment.content }}</p>
      <p>Author: {{ comment.author }}</p>
      <p>Date: {{ formatDate(comment.creationDate) }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      news: {
        id: null,
        title: '',
        content: '',
        author: '',
        creationDate: null,
        tags: [],
        comments: []
      },
      comment: {
        id: null,
        content: '',
        creationDate: null,
        author: ''
      },
      commentToSend: {
        content: '',
        userId: null,
        newsId: null
      },
      tag: {
        id: null,
        name: ''
      }
    };
  },
  methods: {
    fetchNews() {
      axios.get(`http://localhost:8082/api/news/complete/${this.$route.params.newsId}`)
          .then(response => {
            console.log(response.data);
            this.news = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    submitComment() {
      const token = localStorage.getItem('jwt');
      if (token) {
        const decoded = jwt_decode(token);
        this.commentToSend.userId = decoded.user;
        this.commentToSend.newsId = this.news.id
      }
      else {
        alert("You have to login to comment")
        return
      }
      axios.post(`http://localhost:8082/api/comment`, this.commentToSend)
          .then(() => {
            this.comment.content = '';
            this.fetchNews();
          })
          .catch(error => {
            console.log(error);
          });
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toDateString();
    }
  },
  created() {
    this.fetchNews();
  }
}
</script>
