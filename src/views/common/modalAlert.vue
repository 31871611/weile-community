<template>

  <div class="modalAlert">
    <div class="box">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
      <div class="content">
        <p>{{content}}</p>
      </div>
      <div class="btns">
        <button class="cancel" v-show="onCancel" @click="onCancel">取消</button>
        <button class="confirm" @click="onOk">确定</button>
      </div>
    </div>
  </div>

</template>
<script>
/*
 http://cycgit.github.io/demo/alert/alert.js
*/
export default {
  props:{
    title:{
      type:String,
      default:'标题'
    },
    content:{
      type:String,
      default:'内容'
    },
    onCancel:{
      type: Function,
      required: false
    },
    onOk:{
      type: Function,
      required: false
    }
  },
  data(){
    return{
      is:false
    }
  },
  mounted() {
    let _this = this;
  },
  methods:{

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_alert.scss"></style>
