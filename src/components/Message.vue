<template>
  <!-- <div :visible.sync="show" class="text-xs-center test">
    <v-dialog  v-model="showToast" no-click-animation transition="none" fullscreen >
      测试测试
    </v-dialog>
  </div> -->
  <div  :visible.sync="show" class="text-xs-center cy-message">
    <v-dialog   v-model="showToast"
        no-click-animation
        transition="true"
         max-width="100" >
      <div class="msg-tip">{{message}}</div>
    </v-dialog>
  </div>
</template>
<script>

export default {
  name: "Message",
  props: {
    visible: {},
    messsage:{
      type:'String',
    }
  },
  computed: {
    show: {
      get(val) {
        return this.visible;
      },
      set(val) {
        // this.show = val;
        return this.$emit("update:visible", val);
      }
    }
  },
  data() {
    return {
      showToast: false,

    };
  },
  mounted(){
    if(this.showToast){
      
    }
  },
  watch: {
    showToast(val) { 
      if (val) {
        val ? setTimeout(()=>{this.showToast = false;},560) : ''
        // window.global.$root.eventHub.$emit("LodingShow");
      } else {
        // window.global.$root.eventHub.$emit("LodingHide");
      }
    }
  },
};
</script>
<style scoped='scss'>
/* .test{
  height:100vh;
  width:100%;
  background:red;
} */
    .back-loading{
    opacity: 0.76;
    background-color: #212121;
    transition: inherit;
    transition-delay: 150ms;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
     
    }
     .back-loading-content{
            width: 30rem;
            height: 30rem;
            background: black;
            opacity: 1; 
      }
          /* background: #424242; */
.cy-message .v-dialog--fullscreen{
    /* display: flex;
    justify-content: center;
    align-items: center; */
    background: #424242!important;
    color: #c5c5c5;
    padding: 10px 0;
}
.msg-tip{
    background: #424242!important;
    color: #c5c5c5;
    padding: 10px 0;
    border-radius: 2px;
}
</style>

