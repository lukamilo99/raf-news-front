<template>
  <div class="container">
    <div class="edit-category-form">
      <h2>Edit category</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="categoryName" class="form-label">Category name</label>
          <input type="text" class="form-control" id="categoryName" v-model="category.name" required>
        </div>
        <div class="mb-3">
          <label for="categoryDescription" class="form-label">Description</label>
          <textarea class="form-control" id="categoryDescription" v-model="category.description" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Edit</button>
        <button @click="$emit('back')" class="btn btn-secondary">Cancel</button>
      </form>
    </div>
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
      axios.get(`http://localhost:8082/api/category/${this.categoryId}`)
          .then((response) => (this.category = response.data))
          .catch((error) => console.error(error));
    },
    submitForm() {
      axios.put(`http://localhost:8082/api/category/${this.categoryId}`, this.category)
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
