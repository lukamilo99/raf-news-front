<template>
  <form @submit.prevent="submitForm">
    <label for="firstname">Firstname:</label>
    <input id="firstname" v-model="user.firstname" required />

    <label for="lastname">Lastname:</label>
    <input id="lastname" v-model="user.lastname" required />

    <label for="username">Username:</label>
    <input id="username" v-model="user.username" required />

    <label for="role">Role:</label>
    <select id="role" v-model="user.role" required>
      <option value=2>Admin</option>
      <option value=1>Content Creator</option>
    </select>

    <button type="submit">Update</button>
    <button @click="$emit('back')">Cancel</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  props: ['userId'],
  data() {
    return {
      user: {
        id: 0,
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        role: 1
      },
    }
  },
  methods: {
    fetchUser() {
      axios.get(`http://localhost:8082/api/user/${this.userId}`)
          .then(response => {
            this.user = response.data;
            this.user = { ...response.data, role: Number(response.data.role) };
            delete this.user.status;
          })
          .catch(error => {
            console.log(error);
          });
    },
    submitForm() {
      axios.put(`http://localhost:8082/api/user/${this.userId}`, this.user)
          .then(() => {
            this.$emit('refresh');
            this.$emit('back');
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  created() {
    this.fetchUser();
  },
}
</script>
