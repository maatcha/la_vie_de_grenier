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

@keyframes moving-frame {
  17% {
    transform: rotate(7deg) translateX(-30em);
  }
  38% {
    transform: rotate(-7deg) translateX(30em);
  }
  60% {
    transform: rotate(4deg) translateX(-10em);
  }
  75% {
    transform: rotate(-2deg) translateX(5em);
  }
}

@keyframes moving-string {
  60% {
    opacity: 0;
    transform: rotate(18deg);
  }
  65% {
    opacity: 0.5;
  }
  75% {
    opacity: 1;
    transform: rotate(-18deg);
  }
  100% {
    opacity: 1;
  }
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

h1 {
  font-family: 'Satisfy', cursive, sans-serif;
  font-size: 3vw;
  margin: 0;
}

h2 {
  text-align: center;
  margin-right: 3vw;
  margin-left: 3vw;
  margin-bottom: 0;
  font-size: 2vw;
  text-decoration: underline;
  z-index: 1;
}

.container {
  background-color: rgba(226, 231, 235, 1);
  margin-left: 12vw;
  margin-right: 12vw;
  box-shadow: 0px 2px 10px rgba(226, 231, 235, 0.7);
}

.wrapper {
  background-color: rgba(54, 63, 72, 1);
  padding-bottom: 7.5vw;
}

.title {
  padding-top: 3vw;
  margin-top: 0;
  margin-bottom: 2vw;
  text-align: center;
}

.clickableText {
  padding-bottom: 2vw;
  margin-left: 3vw;
}

.clickableText:hover {
  cursor: pointer;
  text-decoration: underline;
  color: red;
}

.mosaic {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

#app {
  height: 100%;
  width: 100%;
  background-color: rgba(54, 63, 72, 1);
}

/* -----------BUTTONS--------------------------------------------- */

.submitButton {
  color: red;
  font-weight: bold;
}

.disabledButton {
  background: grey !important;
  cursor: none !important;
  opacity: 0.3 !important;
}

.disabledButton:hover {
  opacity: 0.3 !important;
}

.btn-twitter {
  background-color: green;
  color: white;
  border-radius: 4px;
  font-weight: bolder;
  padding: 10px 15px;
  text-decoration: none;
  font-family: sans-serif;
}

.btn-twitter:hover {
  opacity: 0.6;
  cursor: pointer;
}

.btn-medium {
  background-color: transparent;
  color: rgb(150, 150, 150);
  border-radius: 50px;
  font-weight: lighter;
  padding: 10px 15px;
  text-decoration: none;
  border: 1px solid rgb(150, 150, 150);
  opacity: 0.7;
  font-family: sans-serif;
}

.btn-medium:hover {
  opacity: 1;
}

.btn-treehouse {
  padding: 10px 15px;
  color: #45d37f;
  border: 2px solid;
  border-radius: 5px;
  font-family: sans-serif;
  text-decoration: none;
  font-weight: 600;
  opacity: 0.7;
  letter-spacing: 0.5;
}

.btn-treehouse:hover {
  opacity: 1;
  background-color: #45d37f;
  border-color: #45d37f;
  color: white;
}

.btn-mine {
  background-color: #283373;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  opacity: 0.6;
  letter-spacing: 1.5;
  margin: 0 2vw !important;
}

.btn-mine:hover {
  opacity: 1;
  cursor: pointer;
}
/* ------------------------GRID----------------------------------------- */

.col-1 {
  width: 8.33%;
}
.col-2 {
  width: 16.66%;
}
.col-3 {
  width: 25%;
}
.col-4 {
  width: 33.33%;
}
.col-5 {
  width: 41.66%;
}
.col-6 {
  width: 50%;
}
.col-7 {
  width: 58.33%;
}
.col-8 {
  width: 66.66%;
}
.col-9 {
  width: 75%;
}
.col-10 {
  width: 83.33%;
}
.col-11 {
  width: 91.66%;
}
.col-12 {
  width: 100%;
}

/* ------------------------GRID----------------------------------------- */
</style>
