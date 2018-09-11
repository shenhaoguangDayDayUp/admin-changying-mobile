<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
      <!-- <v-snackbar
      timeout="2000"
      top
      multi-line
      vertical
      v-model="snackbar"
    >
      {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    var source = [{a:1,b:2},{c:2,b:1}]
    for(var i = 0;i<source.length;i++){
     console.log( Object.prototype.hasOwnProperty.call(source[i], 'a'))
    }
   
    
    // console.log(window.Vuetify)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn-layout{
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center
  }
</style>
