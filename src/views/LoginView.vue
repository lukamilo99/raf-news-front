<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$axios.post('http://localhost:8082/api/user/login', {
        username: this.username,
        password: this.password,
      }).then(response => {
        localStorage.setItem('jwt', response.data.jwt)
        this.$router.push('/cms')
      }).catch(error => {
            console.log(error)
          })
    }
  }
};
</script>
