<template>
  <nav>
    <!-- Add your navigation logic here -->
  </nav>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push('/login');
    }
  }
}
</script>
