<template>
  <div :visible.sync="show" class="text-xs-center test">
    <v-dialog  v-model="showToast" no-click-animation transition="none" fullscreen >
      测试测试
    </v-dialog>
  </div>
</template>
<script>

export default {
  name: "Loading",
  props: {
    visible: {}
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
  watch: {
    showToast(val) { 
      if (val) {// 设置弹框出现不能滚动
        // window.global.$root.eventHub.$emit("LodingShow");
      } else {
        // window.global.$root.eventHub.$emit("LodingHide");
      }
    }
  },
};
</script>
<style scoped='scss'>
.test{
  height:100vh;
  width:100%;
  background:red;
}
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
</style>
