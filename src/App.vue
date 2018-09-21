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
    min-width:60px;
    
    /* justify-content:flex-end; */
    align-items:center
  }
 .btn-layout button{
     min-width: 60px; 
   }
  .v-tabs__item{
    color: #1976d2!important;
  }
  .v-tabs__item:not(.v-tabs__item--active){
    color: #2c3e50;
  }
  .v-tabs__container{
    border-bottom: 1px solid rgba(0,0,0,0.12);
  }
  .Rank .theme--light.v-text-field .v-input__slot:before{
        border-color: rgba(0,0,0,0.12);
  }
  /* .Rank .v-label{
    font-size: 13px;
    padding-left:12px;
  } */
  /* .Rank .v-input{
    font-size: 13px;
  } */
  /* .Rank .v-select__selection--comma{
    margin-left:8px;
  } */
  .v-list__tile__action{
      min-width: 20px;
  }
  .refresh{  
            width:100%;
            height:25px;}
            .refresh i{
            height:25px;
            width:25px;
            float:right;
            color:#ABB6B5;
            cursor: pointer;
            line-height: 25px;
            }
            .refresh i:hover{
                color:#36a3f7;
                transition:all .2s ease-in 0s;
            -moz-transition:all .2s ease-in 0s; /* Firefox 4 */
            -webkit-transition:all .2s ease-in 0s; /* Safari and Chrome */
            -o-transition:all .2s ease-in 0s; /* Opera */
            }
    .v-label {
    font-size: 16px;
    /* padding-left: 12px; */
}
  .v-input{
      font-size: 13px;
    }
    .Rank .v-table__overflow{
      background: #fff;
      overflow-y: auto;
      height:200px;
      position:relative;
    }
</style>
