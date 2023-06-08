<template>
  <div class="users">
    <h1>Users</h1>
    <button @click="addUser()">Add new user</button>
    <div>
      <table>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Username</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role === 1 ? 'Content Creator' : 'Admin' }}</td>
          <td>{{ user.status ? 'Active' : 'Inactive' }}</td>
          <td>
            <button @click="editUser(user.id)">Edit</button>
            <button @click="toggleUserStatus(user.id)">
              {{ user.status ? 'Deactivate' : 'Activate' }}
            </button>
          </td>
        </tr>
      </table>
    </div>
    <NewUserForm v-if="currentView === 'NewUserForm'" @back="currentView = null" @refresh="fetchUsers"/>
    <EditUserForm v-if="currentView === 'EditUserForm'" :user-id="currentUser.id" @back="currentView = null" @refresh="fetchUsers"/>
  </div>
</template>

<script>
import axios from 'axios';
import NewUserForm from '../components/NewUserForm.vue';
import EditUserForm from '../components/EditUserForm.vue';

export default {
  name: 'UsersView',
  components: {
    NewUserForm,
    EditUserForm,
  },
  data() {
    return {
      userList: [],
      currentView: null,
      currentUser: {},
    }
  },
  methods: {
    fetchUsers() {
      axios.get(`http://localhost:8082/api/user`)
          .then(response => {
            this.userList = response.data
          })
          .catch(error => {
            console.log(error);
          });
    },
    addUser() {
      this.currentView = 'NewUserForm';
    },
    editUser(userId) {
      this.currentUser = this.userList.find(user => user.id === userId);
      this.currentView = 'EditUserForm';
    },
    toggleUserStatus(userId) {
      const user = this.userList.find(user => user.id === userId);
      const apiPath = user.status ? 'deactivate' : 'activate';
      axios.put(`http://localhost:8082/api/user/${apiPath}/${userId}`)
          .then(response => {
            user.status = !user.status;
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style scoped>
/* Add styles here */
</style>
