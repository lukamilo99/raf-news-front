<template>
  <div>
    <h1>Edit News</h1>
    <form @submit.prevent="submitForm">
      <select v-model="categoryId" required>
        <option disabled value="">Please select a category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <input type="text" v-model="title" placeholder="Title" required>
      <textarea v-model="content" placeholder="Text" required></textarea>
      <input type="text" v-model="tags" placeholder="Tags (comma separated)">
      <button type="submit">Submit</button>
    </form>
    <button @click="$emit('back')">Back</button>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
  props: ['newsId'],
  data() {
    return {
      categories: [],
      categoryId: '',
      title: '',
      content: '',
      tags: '',
    }
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:8082/api/category/all')
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    fetchNews() {
      axios.get(`http://localhost:8082/api/news/${this.newsId}`)
          .then(response => {
            const news = response.data;
            this.title = news.title;
            this.content = news.content;
          })
          .catch(error => {
            console.log(error);
          });
    },
    submitForm() {
      const token = localStorage.getItem("jwt")
      const decoded = jwt_decode(token);
      const payload = {
        title: this.title,
        content: this.content,
        tags: this.tags.split(',').map(tag => tag.trim()),
        categoryId: this.categoryId,
        userId: decoded.user
      };

      axios.put(`http://localhost:8082/api/news/${this.newsId}`, payload)
          .then(response => {
            console.log(response.data);
            this.$emit('back');
            this.$emit('refresh');
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  created() {
    this.fetchCategories();
    this.fetchNews();
  },
}
</script>

<style scoped>
/* Add styles here */
</style>
