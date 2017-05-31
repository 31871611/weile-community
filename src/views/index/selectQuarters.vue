<template>

  <!-- 小区列表 -->
  <div class="wrap fullPosition">
    <header>
      <div class="header">
        <h2>选择小区</h2>
      </div>
    </header>
    <article class="main">
      <div class="mainScroll selectQuarters">
        <ul>
          <li v-for="(list, index) in quartersLists" @click="selectCurrentQuarters(list)">{{list.name}}</li>
        </ul>
      </div>

      <modal-toast ref="modalToast"></modal-toast>
    </article>
  </div>


</template>
<script>
import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue';

export default {
  name: 'selectQuarters',
  data() {
    return{
      quartersLists:'',
      url:''
    }
  },
  mounted() {
    let _this = this;
    if(this.$route.query.url){
      _this.url = this.$route.query.url;
    }else{
      _this.url = '/';
    }
    // 获取小区列表
    _this.$http.post('/community/getDistributionCommunityList', {
      "projectId":simplestorage.get('projectId')
    },{
      "encryptType":1
    }).then(function(res){
      //console.log(res);
      //console.log(res.data);
      if(res.resultCode == 0){
        _this.quartersLists = res.data;
      }else{
        _this.$refs.modalToast.toast({
          txt:res.msg
        });
      }
    }).catch(function(error) {
      console.log(error)
    })
  },
  methods: {
    // 选择小区
    selectCurrentQuarters:function(data){
      let _this = this;
      // 保存当前小区信息
      simplestorage.set('HLXK_DISTRIBUTION', data);
      // 跳转回首页或原来页面
      this.$router.push(_this.url);
    }
  },
  components: {
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_selectQuarters.scss"></style>
