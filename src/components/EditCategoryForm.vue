<template>
  <div class="edit-category-form">
    <h2>Edit category</h2>
    <form @submit.prevent="submitForm">
      <label>Category name</label>
      <input type="text" v-model="category.name" required>
      <label>Description</label>
      <textarea v-model="category.description" required></textarea>
      <button type="submit">Edit</button>
      <button @click="$emit('back')">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditCategoryForm',
  props: ['categoryId'],
  data() {
    return {
      category: {
        name: '',
        description: '',
      },
    };
  },
  methods: {
    fetchCategory() {
      axios
          .get(`http://localhost:8082/api/category/${this.categoryId}`)
          .then((response) => (this.category = response.data))
          .catch((error) => console.error(error));
    },
    submitForm() {
      axios
          .put(`http://localhost:8082/api/category/${this.categoryId}`, this.category)
          .then(() => {
            this.$emit('back');
            this.$emit('refresh');
          })
          .catch((error) => console.error(error));
    },
  },
  created() {
    this.fetchCategory();
  },
};
</script>
