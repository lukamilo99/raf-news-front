<template>
  <div class="welcome-view">
    <h1>Welcome to News App!</h1>
    <p>This is a platform where you can find the latest news and updates.</p>
  </div>
</template>

<script>
export default {
  name: 'WelcomeView',
};
</script>

<style scoped>
.welcome-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.welcome-view h1 {
  font-size: 3em;
}

.welcome-view p {
  font-size: 1.5em;
  text-align: center;
}
</style>
