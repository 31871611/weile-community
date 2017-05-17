<template>
<div class="view">
  <div class="wrap">

    <article class="main">
      <div class="mainScroll userHome">
        <div class="bg">
          <div class="center">
            <div class="face">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492062648544&di=b885e712d6151036468cf73bf2276428&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-13%2F233023400.jpg" alt="">
            </div>
            <span>用户名</span>
          </div>
        </div>

        <ul class="linkList">
          <li>
            <a href="">
              <i class="myrepair"></i>
              <span>我的报修</span>
              <em>有问题物业来办</em>
              <i class="arrowR"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="paymentrecord"></i>
              <span>缴费记录</span>
              <em>生活缴费，轻松缴纳</em>
              <i class="arrowR"></i>
            </a>
          </li>
        </ul>
        <ul class="linkList">
          <li>
            <router-link to="userOrder">
              <i class="myorder"></i>
              <span>我的订单</span>
              <em>社区购物，免费赠送</em>
              <i class="arrowR"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{path:'/userOrder',query:{group:1}}">
              <i class="mygroupbuy"></i>
              <span>我的团购</span>
              <em>来团购，更优惠</em>
              <i class="arrowR"></i>
            </router-link>
          </li>
          <li>
            <router-link to="userCoupon">
              <i class="mycoupon"></i>
              <span>我的优惠券</span>
              <em>优惠生活，天天购物</em>
              <i class="arrowR"></i>
            </router-link>
          </li>
        </ul>
        <ul class="linkList">
          <li>
            <a href="">
              <i class="mytopic"></i>
              <span>我的话题</span>
              <i class="arrowR"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="myactivity"></i>
              <span>我的活动</span>
              <i class="arrowR"></i>
            </a>
          </li>
        </ul>
        <ul class="linkList">
          <li>
            <a href="">
              <i class="myaddress"></i>
              <span>我的住址</span>
              <i class="arrowR"></i>
            </a>
          </li>
          <li>
            <router-link to="userAddress">
              <i class="myreceiptaddress"></i>
              <span>我的收货地址</span>
              <i class="arrowR"></i>
            </router-link>
          </li>
        </ul>

        <div class="placeholder"></div>
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
import appNav from '../common/appNav.vue';
export default {
  name: 'userHome',
  data() {
    return{

    }
  },
  mounted() {

  },
  methods: {
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
