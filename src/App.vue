<template>
  <div id="app">
    <b-container>
      <app-header></app-header>
      <b-row >
          <b-col cols="12">
            <transition name="slide" type="animation"  mode="out-in">
              <router-view></router-view>
            </transition>
          </b-col>
      </b-row>
      
    </b-container>
  </div>
</template>

<script>
import Header from './components/Navbar.vue'
export default {
  name: 'app',
  components: {
    appHeader: Header
  }
}
</script>
<style>

.slide-enter {
opacity:0;
}

.slide-enter-active {
  animation: slide-in .15s ease-out forwards;
  transition: opacity .15s;
}

.slide-leave {

}

.slide-leave-active {
  animation: slide-out .15s ease-out forwards;
  transition: opacity .15s;
  opacity: 0;
}

@keyframes slide-in {
  from {
  transform: translateY(20px);
  } to {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  from {
  transform: translateY(0);
  } to {
    transform: translateY(20px);
  }
}
</style>
