<template>
  <div class="container">
    <h1>Edit News</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select id="category" class="form-select" v-model="categoryId" required>
          <option value="" disabled selected>Select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" id="title" class="form-control" v-model="title" placeholder="Title" required>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <textarea id="content" class="form-control" v-model="content" placeholder="Text" required></textarea>
      </div>
      <div class="mb-3">
        <label for="tags" class="form-label">Tags</label>
        <input type="text" id="tags" class="form-control" v-model="tags" placeholder="Tags (comma separated)">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <button @click="$emit('back')" class="btn btn-secondary">Back</button>
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
      category: '',
      title: '',
      content: '',
      tags: '',
    }
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:8082/api/category/public/all')
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
            this.category = news.category
          })
          .catch(error => {
            console.log(error);
          });
    },
    submitForm() {
      const token = localStorage.getItem("jwt")
      const decoded = jwt_decode(token);
      let tagsArray = [];

      if(this.tags.trim() !== '') {
        tagsArray = this.tags.split(',').map(tag => tag.trim());
        tagsArray = tagsArray.filter(tag => tag);
        tagsArray = [...new Set(tagsArray)];
      }

      const payload = {
        title: this.title,
        content: this.content,
        tags: tagsArray,
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
</style>
