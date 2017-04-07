<template>
  <div class="login">
    <div class="loginPhoto">
      <img :src="'./static/images/loginBg.jpg'" alt="">
    </div>

    <div class="itemInfo">
      <i class="tel"></i>
      <input type="tel" placeholder="手机号" />
    </div>
    <div class="itemInfo">
      <i class="mail"></i>
      <input type="text" placeholder="验证码" />
      <span class="getCode">获取验证码</span>
    </div>

    <div class="loginBtn">
      登录
    </div>

  </div>
</template>
<script>
import simplestorage from 'simplestorage.js'

export default {
  name: 'login',
  data() {
    return {}
  },
  mounted() {
    this.$http.post('/community/touristLogin')
      .then(function(res) {
        console.log(res)
        let data = res.data || {}
        if(res.resultCode == 0){
          simplestorage.set('HLXK_SESSION', data.session)
          simplestorage.set('HLXK_KEY', data.key)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {}

}
</script>
<style scoped lang="scss" src="../../assets/styles/login.scss"></style>
