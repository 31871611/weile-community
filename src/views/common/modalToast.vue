<template>

  <div class="modalToast" v-if="is">
    <div class="box">
      <i :class="icon" v-show="icon"></i>
      <span>{{txt}}</span>
    </div>
  </div>

</template>
<script>
/*

  文字提示完还需要有个回调

import toast from '../common/modalToast.vue'
<toast ref="toast"></toast>

this.$refs.toast.toast({
  txt:'提示',
  icon:'loading',           // icon：成功success、错误error、警告warning、通知info、加载中loading
  time:0                    // time：显示秒数，0一直运行
});

// 关闭
this.$refs.toast.is = false;

 */
export default {
  data(){
    return{
      is:false,
      icon: '',
      txt: '提示文字',
      time: 3
    }
  },
  methods:{
    toast(setting,callback){
      let _this = this;
      this.icon = setting.icon ||  false;
      this.txt = setting.txt || false;
      this.is = true;
      let time;
      if(setting.time === 0){
        // 0，一直在
        return false;
      }
      if(setting.time == undefined){
        // undefined ，就是没传，3秒关
        time = this.time;
      }else{
        // 有传按，传的时间关闭
        time = setting.time;
      }
      let t = null;
      // 多少秒后关闭
      t = setTimeout(function(){
        _this.is = false;
        clearTimeout(t);
      },time * 1000)
    }
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_modalToast.scss"></style>
