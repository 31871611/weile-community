<template>
  <div class="login">
    <div class="loginPhoto">
      <img :src="'./static/images/loginBg.jpg'" alt="">
    </div>

    <div class="itemInfo">
      <i class="tel"></i>
      <input type="tel" placeholder="请输入手机号码" autofocus v-model="telephone" />
    </div>
    <div class="itemInfo">
      <i class="tel"></i>
      <input type="password" placeholder="请输入密码(不少于6位数)" v-model="password" />
    </div>
    <div class="itemInfo" v-if="false">
      <i class="mail"></i>
      <input type="password" placeholder="验证码" />
      <span class="getCode">获取验证码</span>
    </div>

    <div class="loginBtn" @click="submit">
      登录
    </div>

    <modal-toast ref="modalError" :txt="textError" :time="2"></modal-toast>

  </div>
</template>
<script>
import simplestorage from 'simplestorage.js'
import cryptoUtils from '@/utils/cryptoUtils'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'login',
  data() {
    return {
      telephone:'',
      password:'',
      textError:'',
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
  },
  methods: {
    submit:function(){
      let _this = this;
      if(_this.telephone == '' || _this.telephone.length != 11 || !/^(13|14|15|17|18)\d{9}$/.test(_this.telephone)){
        //alert('请输入正确的手机号码');
        _this.textError = '请输入正确的手机号码';
        _this.$refs.modalError.is = true;
        return false;
      }
      if(_this.password.length < 6){
        //alert('请输入不少于6位数的密码');
        _this.textError = '请输入不少于6位数的密码';
        _this.$refs.modalError.is = true;
        return false;
      }

      this.$http.post('/community/login',{
        "telephone":_this.telephone,
        "password":cryptoUtils.md5(_this.password),
        "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res)
        let data = res.data || {}
        if(res.resultCode == 0){
          simplestorage.set('HLXK_SESSION', data.session);
          simplestorage.set('HLXK_KEY', data.key);
          // 是否登录状态
          simplestorage.set('HLXK_STATUS', true);
          // 是否认证
          simplestorage.set('HLXK_AUTH',data.authorizationStatus);
          //跳转到相关页面
          _this.$router.push(_this.url);
        }else{
          _this.textError = res.msg;
          _this.$refs.modalError.is = true;
          return false;
        }
      }).catch(function(error) {
        console.log(error)
      })
    }
  },
  components: {
    modalToast
  }
}


</script>
<style scoped lang="scss" src="../../assets/styles/login.scss"></style>
