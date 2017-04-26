<template>

  <div class="modalAlert" v-if="is">
    <!-- alert -->
    <div class="alert">
      <div class="title" v-show="title">
        <h2>{{title}}</h2>
      </div>
      <div class="content">
        <p>{{content}}</p>
      </div>
      <div class="btns">
        <button class="cancel" v-show="onCancel" @click="op('cancel')">取消</button>
        <button class="confirm" @click="op('ok')">确定</button>
      </div>
    </div>
    <!-- toast -->
  </div>

</template>
<script>
/*
 <modal-alert ref="modalAlert"></modal-alert>
 this.$refs.modalAlert.alert({
    title: '你确定删除吗?',
    content: '删除不可以恢复...',    //必选
    onOk: function () {            //必选
      alert('你刚点了确定!');
    },
    onCancel: function () {
      alert('你刚点了取消!');
    }
  })

*/
export default {
  props:{

  },
  data(){
    return{
      is: false,
      onCancel: false,
      onOk: false,
      title: false,
      content: false
    }
  },
  created() {

  },
  methods:{
    op(type){
      this.is = false;
      if(type == 'cancel'){
        if(this.onCancel) this.onCancel()
      }else{
        if(this.onOk) this.onOk()
      }
      this.onCancel = false;
      this.onOk = false;
      //document.body.style.overflow = '';
    },
    alert(setting){
      this.title = setting.title ||  false;
      this.content = setting.content || false;
      this.onOk = setting.onOk || false;
      this.onCancel = setting.onCancel || false;
      this.is = true;
      //document.body.style.overflow = 'hidden';
    }
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_alert.scss"></style>
