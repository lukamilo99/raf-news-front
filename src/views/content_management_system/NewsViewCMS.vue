<template>
  <div class="news container mt-5">
    <h1>News</h1>
    <button class="btn btn-primary mb-3" @click="addNews()">Add new news</button>
    <div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="news in newsList" :key="news.id">
          <td>
            <a :href="news.link" target="_blank">{{ news.title }}</a>
          </td>
          <td>{{ news.author }}</td>
          <td>{{ news.creationDate }}</td>
          <td>
            <button class="btn btn-warning me-2" @click="editNews(news.id)">Edit</button>
            <button class="btn btn-danger" @click="deleteNews(news.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <NewNewsForm v-if="currentView === 'NewNewsForm'" @back="currentView = null" @refresh="fetchNews"/>
    <EditNewsForm v-if="currentView === 'EditNewsForm'" :news-id="currentNewsId" @back="currentView = null" @refresh="fetchNews"/>
  </div>
</template>

<script>
import axios from 'axios';
import NewNewsForm from '../../components/NewNewsForm.vue';
import EditNewsForm from '../../components/EditNewsForm.vue';

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
      let url = '';
      if (this.$route.params.categoryId) {
        url = `http://localhost:8082/api/news/public/category/${this.$route.params.categoryId}`;
      } else {
        url = `http://localhost:8082/api/news/public/all`;
      }
      axios.get(url)
          .then(response => {
            this.newsList = response.data;
            this.newsList = this.newsList.map(item => {
              const date = new Date(item.creationDate);
              return { ...item, creationDate: date.toDateString() };
            });
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
