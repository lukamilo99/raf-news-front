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

    <label for="password">Password:</label>
    <input id="password" type="password" v-model="user.password" required />

    <label for="confirmPassword">Confirm Password:</label>
    <input id="confirmPassword" type="password" v-model="confirmPassword" required />

    <button type="submit">Create</button>
    <button @click="$emit('back')">Cancel</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
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
      confirmPassword: '',
    }
  },
  methods: {
    submitForm() {
      if (this.user.password === this.confirmPassword) {
        axios.post(`http://localhost:8082/api/user`, this.user)
            .then(() => {
              this.$emit('refresh');
              this.$emit('back');
            })
            .catch(error => {
              console.log(this.user);
              console.log(error);
            });
      } else {
        alert('Passwords do not match!');
      }
    },
  }
}
</script>

<style scoped>
/* Add styles here */
</style>
