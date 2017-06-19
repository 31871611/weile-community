<template>
  <div class="guest"></div>
</template>
<script>
import simplestorage from 'simplestorage.js'
import {opModal} from '../../plugins/common'

export default {
  name: 'guest',
  data() {
    return {

    }
  },
  created() {


  },
  mounted() {
    let _this = this;
    if(this.$route.query.url){
      _this.url = this.$route.query.url;
    }else{
      _this.url = '/';
    }

    _this.$http.post('/community/touristLogin', {
      "projectId":simplestorage.get('projectId')
    }).then(function (res) {
      //console.log(res)
      let data = res.data || {};
      if (res.resultCode == 0) {
        simplestorage.set('HLXK_SESSION', data.session);
        simplestorage.set('HLXK_KEY', data.key);
        // 判断用户是否登录
        simplestorage.set('HLXK_UserId', data.userInfo.userId);
        // 返回页面
        //_this.$router.replace(_this.url);

      } else {
        opModal.toast({
          txt:res.msg
        })
        return false;
      }
    }).catch(function (error) {
      console.log(error)
      opModal.toast({
        txt:'连接超时！'
      })
      return false;
    })

  },
  methods: {

  },
  components: {

  }
}


</script>
<style scoped lang="scss" src="../../assets/styles/login.scss"></style>
