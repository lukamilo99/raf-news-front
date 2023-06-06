<template>
  <div class="new-category-form">
    <h2>New category</h2>
    <form @submit.prevent="submitForm">
      <label>Category name</label>
      <input type="text" v-model="category.name" required>
      <label>Description</label>
      <textarea v-model="category.description" required></textarea>
      <button type="submit">Add</button>
      <button @click="$emit('back')">Cancel</button>
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
      axios
          .post('http://localhost:8082/api/category/', this.category)
          .then(() => {
            this.$emit('back');
            this.$emit('refresh');
          })
          .catch((error) => console.error(error));
    },
  },
};
</script>
