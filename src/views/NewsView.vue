<template>
  <div class="news">
    <h1>News</h1>
    <button @click="addNews()">Add new news</button>
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        <tr v-for="news in newsList" :key="news.id">
          <td>
            <a :href="news.link" target="_blank">{{ news.title }}</a>
          </td>
          <td>{{ news.author }}</td>
          <td>{{ news.date }}</td>
          <td>
            <button @click="editNews(news.id)">Edit</button>
            <button @click="deleteNews(news.id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
    <NewNewsForm v-if="currentView === 'NewNewsForm'" @back="currentView = null" @refresh="fetchNews"/>
    <EditNewsForm v-if="currentView === 'EditNewsForm'" :news-id="currentNewsId" @back="currentView = null" @refresh="fetchNews"/>
  </div>
</template>

<script>
import axios from 'axios';
import NewNewsForm from '../components/NewNewsForm.vue';
import EditNewsForm from '../components/EditNewsForm.vue';

export default {
  name: 'NewsView',
  components: {
    NewNewsForm,
    EditNewsForm,
  },
  data() {
    return {
      newsList: [],
      currentView: null,
      currentNewsId: null,
    }
  },
  methods: {
    fetchNews() {
      axios.get(`http://localhost:8082/api/news/category/${this.$route.params.categoryId}`)
          .then(response => {
            this.newsList = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    addNews() {
      this.currentView = 'NewNewsForm';
    },
    editNews(newsId) {
      this.currentNewsId = newsId;
      this.currentView = 'EditNewsForm';
    },
    deleteNews(newsId) {
      axios.delete(`http://localhost:8082/api/news/${newsId}`)
          .then(response => {
            console.log(response.data);
            this.fetchNews();
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  created() {
    this.fetchNews();
  }
}
</script>

<style scoped>
/* Add styles here */
</style>
