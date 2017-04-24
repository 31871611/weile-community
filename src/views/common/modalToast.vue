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
  icon：成功success、错误error、警告warning、通知info、加载中loading
  time：显示秒数，0一直运行
  <modal-toast :icon="'error'" :txt="'标题'" :time="10" ref="modalToast"></modal-toast>
  this.$refs.modalToast.is = true;
*/
export default {
  props:{
    icon:String,
    txt:{
      type:String,
      default:'提示文字'
    },
    time:{
      type:Number,
      default: 3
    }
  },
  data(){
    return{
      is:false
    }
  },
  beforeUpdate() {
    let _this = this;
    let t = null;

    if(_this.time !== 0){
      // 多少秒后关闭
      t = setTimeout(function(){
        _this.is = false;
        clearTimeout(t);
      },this.time * 1000)
    }

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/components/_modalToast.scss"></style>
