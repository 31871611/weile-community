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
    </article>
  </div>


</template>
<script>
import simplestorage from 'simplestorage.js'

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
    },{
      "encryptType":1
    }).then(function(res){
      //console.log(res);
      if(res.resultCode != 0){
        alert(res.msg);
        return false;
      }
      _this.quartersLists = res.data;
      //console.log(res.data);
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

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_selectQuarters.scss"></style>
