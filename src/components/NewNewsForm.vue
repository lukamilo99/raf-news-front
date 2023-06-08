<template>
  <div>
    <h1>Add New News</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="title" placeholder="Title" required>
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <textarea v-model="content" placeholder="Text" required></textarea>
      <input type="text" v-model="tags" placeholder="Tags (comma separated)">
      <button type="submit">Submit</button>
    </form>
    <button @click="$emit('back')">Back</button>
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
      axios.get('http://localhost:8082/api/category/all')
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
