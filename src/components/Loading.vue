<template>
  <div :visible.sync="show" class="text-xs-center">

    <v-dialog
      v-model="showToast"
        no-click-animation
        transition="none"
         fullscreen
    >
      <div class="back-loading" > 
          <!-- <div class="back-loading-content"> -->
          <v-progress-circular
            :width="3"
            color="#1867c0"
            indeterminate
    ></v-progress-circular>
          <!-- </div> -->
  

        </div>
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
  methods: {
    onCancel() {
      if (!this.cancel) {
        this.showToast = false;
      }
      this.$emit("cancel");
    },
    onConfirm() {
      //  this.showToast = false
      this.$emit("success");
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
  data() {
    return {
      title: "提示",
      showToast: false,
      rightBtnText: "取消",
      leftBtnText: "确定",
      content: "",
      cancelShow:true //有无取消按钮
    };
  }
};
</script>
<style scoped='scss'>
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
