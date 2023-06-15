<template>
  <div class="categories container mt-5">
    <h1>Categories</h1>
    <button class="btn btn-primary mb-3" @click="addCategory()">Add new category</button>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.id">
        <td>
          <router-link :to="{ name: 'News', params: { categoryId: category.id } }">{{ category.name }}</router-link>
        </td>
        <td>{{ category.description }}</td>
        <td>
          <button class="btn btn-warning me-2" @click="editCategory(category.id)">Edit</button>
          <button class="btn btn-danger" @click="deleteCategory(category.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <NewCategoryForm v-if="currentView === 'NewCategoryForm'" @back="currentView = null" @refresh="fetchCategories"/>
    <EditCategoryForm v-if="currentView === 'EditCategoryForm'" :category-id="currentCategoryId" @back="currentView = null" @refresh="fetchCategories"/>
  </div>
</template>

<script>
import axios from 'axios';
import NewCategoryForm from '../../components/NewCategoryForm.vue';
import EditCategoryForm from '../../components/EditCategoryForm.vue';

export default {
  name: 'CategoriesView',
  components: {
    NewCategoryForm,
    EditCategoryForm,
  },
  data() {
    return {
      categories: [],
      currentView: null,
      currentCategoryId: null,
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
    addCategory() {
      this.currentView = 'NewCategoryForm';
    },
    editCategory(categoryId) {
      this.currentCategoryId = categoryId;
      this.currentView = 'EditCategoryForm';
    },
    deleteCategory(categoryId) {
      axios.delete(`http://localhost:8082/api/category/${categoryId}`)
          .then(response => {
            console.log(response.data);
            this.fetchCategories();
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  created() {
    this.fetchCategories();
  }
}
</script>

<style scoped>
/* Add styles here */
</style>
