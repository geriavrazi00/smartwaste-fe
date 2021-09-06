<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <h1>{{ title }}</h1> -->
  <!-- <input type="text" ref="name">
  <button @click="handleClick">click me</button> -->
  <!-- <p>Welcome...</p> -->

  <!-- <teleport to="#modals" v-if="showModal">
    <Modal :header="header" :text="text" :arr="arr" theme="sale" @close="toggleModal">
      <template v-slot:links>
        <a href="#">sign up now</a>
        <a href="#">more info</a>
      </template>
      <h1>Hey man</h1>
      <p>whazzap</p>
    </Modal>
  </teleport>

  <teleport to="#modals" v-if="showModal2">
    <Modal @close="toggleModal2">
      <template v-slot:links>
        <a href="#">Save</a>
        <a href="#">Cancel</a>
      </template>
      <h1>Do you want to save the game?</h1>
      <p>All unsaved data will be lost after this</p>
    </Modal>
  </teleport>

  <br>
  <button @click.alt="toggleModal">open modal (click + alt)</button>
  <br>
  <button @click="toggleModal2">open modal 2</button> -->
  <!-- <Login/> -->
  <router-view/>
</template>

<script>
// import Login from './components/auth/Login.vue'

export default {
  name: 'App',
  // components: { Login },
  data() {
    return {
      title: 'My First Vue Project',
      arr: ["test", 265],
      header: 'Sign up for the Giveaway!',
      text: 'Grab them by the pussy!',
      showModal: false,
      showModal2: false
    }
  },
  methods: {
    handleClick() {
      // $refs - referenca per elemente te ndryshme te domit
      console.log(this.$refs.name);
      this.$refs.name.classList.add('active');
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },

    toggleModal2() {
      this.showModal2 = !this.showModal2;
    }
  }
}
</script>

<style>
#app, #modals {
  font-family: ttcommons-regular, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
body {
  background-color: lightgray!important;
}
</style>
