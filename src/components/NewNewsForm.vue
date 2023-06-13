<template>
  <div class="container">
    <h1>Add New News</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input id="title" type="text" v-model="title" class="form-control" placeholder="Title" required>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select id="category" class="form-select" v-model="selectedCategory">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Text</label>
        <textarea id="content" class="form-control" v-model="content" placeholder="Text" required></textarea>
      </div>
      <div class="mb-3">
        <label for="tags" class="form-label">Tags</label>
        <input id="tags" type="text" class="form-control" v-model="tags" placeholder="Tags (comma separated)">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <button @click="$emit('back')" class="btn btn-secondary">Back</button>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      title: '',
      content: '',
      tags: '',
      selectedCategory: null,
      categories: [],
    }
  },
  created() {
    this.fetchCategories();
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
    submitForm() {
      const token = localStorage.getItem('jwt');
      const decoded = jwt_decode(token);
      let payload = {
        title: this.title,
        content: this.content,
        tags: this.tags.split(',').map(tag => tag.trim()),
        categoryId: this.selectedCategory,
        userId: decoded.user
      };

      axios.post('http://localhost:8082/api/news', payload)
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
}
</script>

<style scoped>
/* Add styles here */
</style>
