<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script></script>

<style>
@import url('https://fonts.googleapis.com/css?family=Monoton|Cookie|Courgette|Roboto|Satisfy&display=swap');

/* ------TRANSITIONS----------------- */

.slide-fade-enter {
  opacity: 0;
  transform: translateX(10em);
  /* transform: rotate3d(0, 1, 0.5, 3.142rad); */
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10em);
  /* transform: rotate3d(0, 1, 0.5, 3.142rad); */
}

/* ------TRANSITIONS----------------- */

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
}

h2 {
  text-align: center;
  margin-right: 3vw;
  margin-left: 3vw;
  margin-bottom: 0;
}
</style>
