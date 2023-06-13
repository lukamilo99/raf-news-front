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
      <button type="submit" class="btn btn-primary">Update</button>
      <button @click="$emit('back')" class="btn btn-secondary">Cancel</button>
    </form>
  </div>
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
