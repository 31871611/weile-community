<template>
<div class="view">
  <div class="wrap">

    <article class="main">
      <div class="mainScroll userHome">
        <div class="bg">
          <div class="center">
            <div class="face" v-if="face">
              <img :src="face" alt="">
            </div>
            <span v-if="name">{{name}}</span>
          </div>
        </div>

        <ul class="list">

          <li v-for="list in lists"><a :href="list.menuUrl"><div :class="list.icon">{{list.menuName}}</div></a></li>

          <!--<li><a href=""><div class="mytopic">我的话题</div></a></li>-->
          <!--<li><a href=""><div class="myactivity">我的活动</div></a></li>-->
          <!--<li><a href=""><div class="myrepair">我的报修</div></a></li>-->
          <!--<li><a href=""><div class="mycomplain">我的投诉</div></a></li>-->
          <!--<li><a href=""><div class="myhardware">我的硬件</div></a></li>-->
          <!--<li><a href=""><div class="myauth">我的授权</div></a></li>-->
          <!--<li><a href=""><div>我的达人</div></a></li>-->
          <!--<li><a href=""><div>我的服务</div></a></li>-->
          <li><router-link :to="{path:'userCoupon',query:{projectId,projectId}}"><div class="mycoupon">我的优惠券</div></router-link></li>
          <li><router-link :to="{path:'userOrder',query:{projectId,projectId}}"><div class="myorder">我的订单</div></router-link></li>
          <li><router-link :to="{path:'/userOrder',query:{group:1,projectId,projectId}}"><div class="mygroupbuy">我的团购</div></router-link></li>
          <li><router-link :to="{path:'userAddress',query:{projectId,projectId}}"><div class="myreceiptaddress">收货地址</div></router-link></li>
        </ul>

        <!--<ul class="linkList">-->
          <!--<li>-->
            <!--<a href="javascript:;" @click="toLink('http://www.baidu.com')">-->
              <!--<i class="myrepair"></i>-->
              <!--<span>我的报修</span>-->
              <!--<em>有问题物业来办</em>-->
              <!--<i class="arrowR"></i>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="">-->
              <!--<i class="paymentrecord"></i>-->
              <!--<span>缴费记录</span>-->
              <!--<em>生活缴费，轻松缴纳</em>-->
              <!--<i class="arrowR"></i>-->
            <!--</a>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<ul class="linkList">-->
          <!--<li>-->
            <!--<router-link to="userOrder">-->
              <!--<i class="myorder"></i>-->
              <!--<span>我的订单</span>-->
              <!--<em>社区购物，免费赠送</em>-->
              <!--<i class="arrowR"></i>-->
            <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
            <!--<router-link :to="{path:'/userOrder',query:{group:1}}">-->
              <!--<i class="mygroupbuy"></i>-->
              <!--<span>我的团购</span>-->
              <!--<em>来团购，更优惠</em>-->
              <!--<i class="arrowR"></i>-->
            <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
            <!--<router-link to="userCoupon">-->
              <!--<i class="mycoupon"></i>-->
              <!--<span>我的优惠券</span>-->
              <!--<em>优惠生活，天天购物</em>-->
              <!--<i class="arrowR"></i>-->
            <!--</router-link>-->
          <!--</li>-->
        <!--</ul>-->

        <!--<ul class="linkList">-->
          <!--<li>-->
            <!--<a href="">-->
              <!--<i class="myauth"></i>-->
              <!--<span>我的授权</span>-->
              <!--<i class="arrowR"></i>-->
            <!--</a>-->
          <!--</li>-->
        <!--</ul>-->

        <!--<ul class="linkList">-->
          <!--<li>-->
            <!--<a href="">-->
              <!--<i class="mytopic"></i>-->
              <!--<span>我的话题</span>-->
              <!--<i class="arrowR"></i>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="">-->
              <!--<i class="myactivity"></i>-->
              <!--<span>我的活动</span>-->
              <!--<i class="arrowR"></i>-->
            <!--</a>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<ul class="linkList">-->
          <!--<li>-->
            <!--<a href="">-->
              <!--<i class="myaddress"></i>-->
              <!--<span>我的住址</span>-->
              <!--<i class="arrowR"></i>-->
            <!--</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<router-link to="userAddress">-->
              <!--<i class="myreceiptaddress"></i>-->
              <!--<span>我的收货地址</span>-->
              <!--<i class="arrowR"></i>-->
            <!--</router-link>-->
          <!--</li>-->
        <!--</ul>-->

        <!--<div class="placeholder"></div>-->
      </div>
    </article>
    <footer>
      <app-nav :select-class="'userHome'"></app-nav>
    </footer>
  </div>

  <transition name="SlideRightLeft">
    <router-view></router-view>
  </transition>

</div>
</template>
<script>
import simplestorage from 'simplestorage.js'
import appNav from '../common/appNav.vue';

export default {
  name: 'userHome',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      lists:'',
      face:'',
      name:''
    }
  },
  mounted() {

    // 头像、用户名
    if(simplestorage.get('HLXK_UserInfo')){
      if(simplestorage.get('HLXK_UserInfo').nickName) this.name = simplestorage.get('HLXK_UserInfo').nickName;
      if(simplestorage.get('HLXK_UserInfo').headImgUrl) this.face = simplestorage.get('HLXK_UserInfo').headImgUrl;
    }

    // 获取菜单
    this.getNav()

  },
  methods: {
    // 获取菜单
    getNav:function(){
      let _this = this;

      this.$http.post('/api/getMenu', {
        "projectId":simplestorage.get('projectId'),
        "menuType":2,                                                   // 1、个人中心菜单 2 、便利店首页菜单
        "communityId":simplestorage.get('HLXK_DISTRIBUTION').id         // 小区ID
      },{
        "encryptType":1
      }).then(function(res){
        console.log(res);
        if(res.resultCode == 0){
          _this.lists = res.data;
          //console.log(res.data);

        }else{
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 跳转到外部url
    toLink:function(url){
      location.href = url;
    }
  },
  components: {
    appNav
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userHome.scss"></style>
