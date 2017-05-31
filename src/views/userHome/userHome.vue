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
      if(simplestorage.get('HLXK_UserInfo').nickname) this.name = simplestorage.get('HLXK_UserInfo').nickname;
      if(simplestorage.get('HLXK_UserInfo').headimgurl) this.face = simplestorage.get('HLXK_UserInfo').headimgurl;
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
        "menuType":1,                                                   // 1、个人中心菜单 2 、便利店首页菜单
        "communityId":simplestorage.get('HLXK_DISTRIBUTION').id         // 小区ID
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
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
<style lang="scss" src="../../assets/styles/userHome.scss"></style>
