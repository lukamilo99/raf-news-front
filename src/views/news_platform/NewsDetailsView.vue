<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ news.title }}</h1>
    <p>{{ news.content }}</p>
    <p><small class="text-muted">Published at: {{ formatDate(news.creationDate) }}</small></p>
    <p>Author: <strong>{{ news.author }}</strong></p>

    <div class="my-4">
      <span class="badge bg-primary me-1" v-for="tag in news.tags" :key="tag.id">
        <router-link class="text-white text-decoration-none" :to="`/news-platform/tag/${tag.id}`">{{ tag.name }}</router-link>
      </span>
    </div>

    <h2 class="my-4">Comments</h2>

    <form @submit.prevent="submitComment" class="mb-4">
      <div class="mb-3">
        <textarea v-model="commentToSend.content" class="form-control comment-textarea" placeholder="Your Comment" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <div v-for="comment in news.comments" :key="comment.id" class="mb-4 bg-light p-3 rounded">
      <p class="mb-1">{{ comment.content }}</p>
      <p><small class="text-muted">Author: {{ comment.author }}</small></p>
      <p><small class="text-muted">Date: {{ formatDate(comment.creationDate) }}</small></p>
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
      axios.get(`http://localhost:8082/api/news/public/complete/${this.$route.params.newsId}`)
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
