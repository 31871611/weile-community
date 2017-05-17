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
      <i class="password"></i>
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

    <modal-toast ref="modalToast"></modal-toast>

    <app-nav ref="appnav" v-show="false"></app-nav>

  </div>
</template>
<script>
import simplestorage from 'simplestorage.js'
import cryptoUtils from '@/utils/cryptoUtils'
import modalToast from '../common/modalToast.vue'
import cart from '../../plugins/cart'
import appNav from '../common/appNav.vue';

export default {
  name: 'login',
  data() {
    return {
      telephone:'',
      password:'',
      url:''
    }
  },
  created() {

    // 已登录
    if(simplestorage.get('HLXK_STATUS')){
      this.$router.back();
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
        _this.$refs.modalToast.toast({
          txt:'请输入正确的手机号码'
        });
        return false;
      }
      if(_this.password.length < 6){
        _this.$refs.modalToast.toast({
          txt:'请输入不少于6位数的密码'
        });
        return false;
      }
      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });

      this.$http.post('/community/login',{
        "telephone":_this.telephone,
        "password":cryptoUtils.md5(_this.password),
        "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
        //"openid":simplestorage.get('HLXK_OPENID')
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res)
        let data = res.data || {}
        if(res.resultCode == 0){
          simplestorage.set('HLXK_SESSION', data.session);
          simplestorage.set('HLXK_KEY', data.key);
          // 保存用户信息
          simplestorage.set('HLXK_UserInfo', data.userInfo);
          // 是否登录状态
          simplestorage.set('HLXK_STATUS', true);
          // 是否认证 //当前小区的认证状态：0未验证、1已验证、2等待业主验证、3等待物业验证
          simplestorage.set('HLXK_AUTH',data.authorizationStatus);
          // 查询本地缓存数据
          let goodsInfo = cart.queryAll();
          if(goodsInfo.length > 0){
            // 提交购物车数据
            _this.submitToShopping(function(){
              // 跳转到相关页面
              _this.$router.push(_this.url);
            });
          }else{
            // 跳转到相关页面
            _this.$router.push(_this.url);
          }
        }else{
          // 登录错误提示
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
          return false;
        }
        // 隐藏加载中
        _this.$refs.modalToast.is = false;
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 提交本地缓存到购物车
    submitToShopping:function(callback){
      let _this = this;
      console.log('购物车');
      //////////////////////////////////////////

        // 合并本地缓存购物车跟服务器端购物车数据
        var jsonStr = cart.queryAllJsonStr(true);

        // 批量添加购物车商品
        this.$http.post('/community/mergeCartGoods', {
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "goodsInfo":jsonStr
        },{
          "encryptType":1
        }).then(function(res) {
          console.log(res);
          if (res.resultCode == 0) {
            // 删除本地缓存
            cart.removeAll();
            // 修改底部的值
            _this.$refs.appnav.shoppingNum = res.data.totalCount;
            // 跳转
            callback();
          }else{
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
            return false;
          }
        }).catch(function(error) {
          console.log(error)
        })

      //////////////////////////////////////////
    }
  },
  components: {
    modalToast,
    appNav
  }
}


</script>
<style scoped lang="scss" src="../../assets/styles/login.scss"></style>
