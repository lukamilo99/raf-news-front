<template>
  <div class="container">
    <h2>New category</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="categoryName" class="form-label">Category name</label>
        <input id="categoryName" type="text" v-model="category.name" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" v-model="category.description" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add</button>
      <button @click="$emit('back')" class="btn btn-secondary">Cancel</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'NewCategoryForm',
  data() {
    return {
      category: {
        name: '',
        description: '',
      },
    };
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:8082/api/category', this.category)
          .then(() => {
            this.$emit('back');
            this.$emit('refresh');
          })
          .catch((error) => console.error(error));
    },
  },
};
</script>
