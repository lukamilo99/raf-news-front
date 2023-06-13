<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="firstname" class="form-label">Firstname</label>
        <input id="firstname" class="form-control" v-model="user.firstname" required />
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Lastname</label>
        <input id="lastname" class="form-control" v-model="user.lastname" required />
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input id="username" class="form-control" v-model="user.username" required />
      </div>
      <div class="mb-3">
        <label for="role" class="form-label">Role</label>
        <select id="role" class="form-select" v-model="user.role" required>
          <option value=2>Admin</option>
          <option value=1>Content Creator</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input id="password" type="password" class="form-control" v-model="user.password" required />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input id="confirmPassword" type="password" class="form-control" v-model="confirmPassword" required />
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
      <button @click="$emit('back')" class="btn btn-secondary">Cancel</button>
    </form>
  </div>
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
