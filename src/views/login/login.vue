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
      <i class="code"></i>
      <input type="text" placeholder="请输入验证码" v-model="code" />
      <span class="getCode" @click="getCode()" :class="{'select':isCode}">{{codeTxt}}</span>
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
import {opModal} from '../../plugins/common'


export default {
  name: 'login',
  data() {
    return {
      wxUserInfo:'',
      telephone:'',
      password:'',
      code:'',
      codeTxt:'获取验证码',
      isCode:false,
      url:''
    }
  },
  created() {

    // 已登录返回
    if(simplestorage.get('HLXK_UserId') != -1){
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

    // 保存微信用户信息
    _this.saveWxUserInfo();

  },
  methods: {
    // 保存微信用户信息
    saveWxUserInfo:function(){
      let _this = this;
      let wxUserInfo = simplestorage.get('HLXK_UserInfo');

      _this.$http.post('/community/authorize', {
        "projectId":simplestorage.get('projectId'),
        "openid":wxUserInfo.openid,
        "nickname":wxUserInfo.nickname,
        "sex":wxUserInfo.sex,
        "country":wxUserInfo.country,
        "province":wxUserInfo.province,
        "city":wxUserInfo.city,
        "headimgurl":wxUserInfo.headimgurl,    //头像
        "unionid":wxUserInfo.unionid
      }).then(function (res) {
        //console.log(res)
        if (res.resultCode == 0) {

        } else {
          // 提交失败
        }
      }).catch(function (error) {
        console.log(error)
        opModal.toast({
          txt:'连接超时！'
        })
        return false;
      })

    },
    // 获取验证码
    getCode:function(){
      let _this = this;
      let num = 60;
      let t = null;

      if(_this.isCode){
        return false;
      }

      if(_this.telephone == '' || _this.telephone.length != 11 || !/^(13|14|15|17|18)\d{9}$/.test(_this.telephone)){
        _this.$refs.modalToast.toast({
          txt:'请输入正确的手机号码'
        });
        return false;
      }


      // 请求验证码
      this.$http.post('/community/getVerificationCode',{
        "telephone":_this.telephone,
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
        "openid":simplestorage.get('HLXK_OPENID')
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res)
        if(res.code == 0){

          _this.codeTxt = num + 's';
          _this.isCode = true;

          // 倒记时
          t = setInterval(function(){
            if(num == 0){
              _this.codeTxt = '获取验证码';
              _this.isCode = false;
              clearTimeout(t);
            }else{
              num--;
              _this.codeTxt = num + 's';
            }
          },1000)


          _this.$refs.modalToast.toast({
            txt:res.msg
          });

        }else{
          // 错误提示
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
          return false;
        }

      }).catch(function(error) {
        console.log(error)
        opModal.toast({
          txt:'连接超时！'
        })
        return false;
      })



    },
    // 登录
    submit:function(){
      let _this = this;
      if(_this.telephone == '' || _this.telephone.length != 11 || !/^(13|14|15|17|18)\d{9}$/.test(_this.telephone)){
        _this.$refs.modalToast.toast({
          txt:'请输入正确的手机号码'
        });
        return false;
      }
      if(_this.code == ''){
        _this.$refs.modalToast.toast({
          txt:'请输入正确的验证码'
        });
        return false;
      }
      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });

      this.$http.post('/community/checkVerificationCode',{
        "telephone":_this.telephone,
        "verifyCode":_this.code,
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
        "openid":simplestorage.get('HLXK_OPENID'),
        "sessionId":simplestorage.get('HLXK_SessionId')
      },{
        "encryptType":0
      }).then(function(res) {
        console.log(res)
        let data = res.data || {}
        if(res.resultCode == 0){
          simplestorage.set('HLXK_SESSION', data.session);
          simplestorage.set('HLXK_KEY', data.key);
          // 用于判断用户是否登录
          simplestorage.set('HLXK_UserId', data.userInfo.userId);

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
        opModal.toast({
          txt:'连接超时！'
        })
        return false;
      })
    },
    // 提交本地缓存到购物车
    submitToShopping:function(callback){
      let _this = this;
      //////////////////////////////////////////

        // 合并本地缓存购物车跟服务器端购物车数据
        var jsonStr = cart.queryAllJsonStr(true);

        // 批量添加购物车商品
        this.$http.post('/community/mergeCartGoods', {
          "projectId":simplestorage.get('projectId'),
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
          opModal.toast({
            txt:'连接超时！'
          })
          return false;
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
