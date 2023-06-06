<template>
  <div class="categories">
    <h1>Categories</h1>
    <button @click="addCategory()">Add new category</button>
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        <tr v-for="category in categories" :key="category.id">
          <td>
            <router-link :to="{ name: 'News', params: { categoryId: category.id } }">{{ category.name }}</router-link>
          </td>
          <td>{{ category.description }}</td>
          <td>
            <button @click="editCategory(category.id)">Edit</button>
            <button @click="deleteCategory(category.id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
    <NewCategoryForm v-if="currentView === 'NewCategoryForm'" @back="currentView = null" @refresh="fetchCategories"/>
    <EditCategoryForm v-if="currentView === 'EditCategoryForm'" :category-id="currentCategoryId" @back="currentView = null" @refresh="fetchCategories"/>
  </div>
</template>

<script>
import axios from 'axios';
import NewCategoryForm from '../components/NewCategoryForm.vue';
import EditCategoryForm from '../components/EditCategoryForm.vue';

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
      axios.get('http://localhost:8082/api/category/all')
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
