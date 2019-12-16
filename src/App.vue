<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script></script>

<style>
@import url('https://fonts.googleapis.com/css?family=Monoton|Cookie|Courgette|Roboto|Satisfy&display=swap');

html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Courgette', cursive, sans-serif;
}

#app {
  height: 100%;
  width: 100%;
  background-color: rgba(54, 63, 72, 1);
  /* box-sizing: border-box;
  width: 500px;
  padding: 0 20px 20px;
  margin: 0 auto; */
}

h1 {
  font-family: 'Satisfy', cursive, sans-serif;
  margin: 0;
  /* line-height: 140%; */
}

h2 {
  text-align: center;
  margin-right: 3vw;
  margin-left: 3vw;
  margin-bottom: 0;
  /* font-size: 2vw; */
}

p {
  font-size: 1, 5vw;
}
</style>
