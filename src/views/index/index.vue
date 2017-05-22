<template>
<div class="view">

  <div class="wrap">
    <article class="main">
      <div class="mainScroll index">

        <div class="currentQuarters" @click="goSelectQuarters(true)">
          <span>{{textCurrentQuarters}}</span>
          <i></i>
        </div>

        <slider ref="slider" @toContent="toContent" :items="adLists" :width="640" :height="240" :speed="5000"></slider>

        <div class="indexNav">
          <div @click="toLink(list.menuUrl)" v-for="list in nav" :class="list.icon">{{list.menuName}}</div>
        </div>

        <!-- 首页活动推荐1 -->
        <div class="activityHomeLayoutList" v-if="categoryHomeLayoutList">
          <!-- list.styleCode -->
          <ul>
            <li v-for="list in categoryHomeLayoutList" :class="'style' + list.styleCode">
              <a href="javascript:;" v-if="list.type == 1" @click="toLink(list.link)">
                <img :src="list.imageUrl" :title="list.title" alt="自定义url">
              </a>
              <router-link v-else-if="list.type == 2" :to="{path:'store',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="便利店.分类">
              </router-link>
              <router-link v-else-if="list.type == 3" to="/sale">
                <img :src="list.imageUrl" :title="list.title" alt="限时抢购">
              </router-link>
              <router-link v-else-if="list.type == 4" :to="{path:'fullDiscount',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品优惠活动">
              </router-link>
              <router-link v-else-if="list.type == 5 && list.thematicType == 1" :to="{path:'subject',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品专题">
              </router-link>
              <router-link v-else-if="list.type == 5 && list.thematicType == 2" :to="{path:'subjectCoupon',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="优惠券专题">
              </router-link>
              <router-link v-else-if="list.type == 6" :to="{path:'commodity',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品详情">
              </router-link>
              <router-link v-else-if="list.type == 7" :to="{path:'subjectCoupon',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="优惠券专题">
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 首页活动推荐2 -->
        <div class="activityHomeLayoutList" v-if="activityHomeLayoutList">
          <div class="title">
            <h2>活动专区</h2>
          </div>
          <ul>
            <li v-for="list in activityHomeLayoutList" :class="'style' + list.styleCode">
              <a href="javascript:;" v-if="list.type == 1" @click="toLink(list.link)">
                <img :src="list.imageUrl" :title="list.title" alt="自定义url">
              </a>
              <router-link v-else-if="list.type == 2" :to="{path:'store',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="便利店.分类">
              </router-link>
              <router-link v-else-if="list.type == 3" to="/sale">
                <img :src="list.imageUrl" :title="list.title" alt="限时抢购">
              </router-link>
              <router-link v-else-if="list.type == 4" :to="{path:'subject',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品优惠活动">
              </router-link>
              <router-link v-else-if="list.type == 5 && list.thematicType == 1" :to="{path:'subject',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品专题">
              </router-link>
              <router-link v-else-if="list.type == 5 && list.thematicType == 2" :to="{path:'subjectCoupon',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="优惠券专题">
              </router-link>
              <router-link v-else-if="list.type == 6" :to="{path:'commodity',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品详情">
              </router-link>
              <router-link v-else-if="list.type == 7" :to="{path:'subjectCoupon',query: { id: list.link }}">
                <img :src="list.imageUrl" :title="list.title" alt="优惠券专题">
              </router-link>
            </li>
          </ul>
        </div>



        <div class="groupBuy" v-if="groupBuyList">
          <div class="title">
            <h2>团购</h2>
          </div>
          <div class="scroll">
            <ul>
              <li v-for="list in groupBuyList">
                <router-link :to="{path:'commodity',query: { id: list.commodityId }}">
                  <img :src="list.url" alt="">
                  <h3>{{list.name}}</h3>
                  <div class="price">
                    <b>￥</b><strong>{{list.price / 1000 | price}}</strong>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="recommend" v-if="recommendList">
          <div class="title">
            <h2>推荐商品</h2>
            <router-link to="store" class="more">更多<i></i></router-link>
          </div>
          <ul>
            <li v-for="(list,index) in recommendList">
              <div class="content">
                <i class="activity" v-if="list.isActivity == 1">活动{{list.isActivity}}</i>
                <i class="goIng" v-if="list.isFlashSale == 1 && list.flashSaleStatus == 1">抢购中</i>
                <router-link :to="{path:'commodity',query: { id: list.commodityId }}" class="photo">
                  <img :src="list.url" :alt="list.commodityId">
                </router-link>
                <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                <div class="bottom">
                  <div class="price">
                    <b>￥</b>
                    <!--
                      flashSaleStatus，为0时显示价格，剩下显示抢购价格
                      会不会出现flashSaleStatus为""，isFlashSale为1的状态
                      isFlashSale，为""时显示价格，1时显示抢购价格
                    -->
                    <strong v-if="list.isFlashSale == '' || list.flashSaleStatus == 0">{{list.price / 1000 | price}}</strong>
                    <strong v-if="list.isFlashSale == 1">{{list.flashSalePrice / 1000 | price}}</strong>
                  </div>
                  <div class="go" v-if="list.isFlashSale == 1">
                    马上抢
                  </div>

                  <car-count ref="carcount" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.isFlashSale != 1 && list.inventory > 0" :index="index" :commodity-id="list.commodityId" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                </div>
              </div>
            </li>

          </ul>
        </div>

        <!-- 领取优惠券弹窗 -->
        <div class="indexSetCouponAlert" style="display: none">
          <div class="box">
            <div class="bg"></div>
            <div class="list">
              <ul>
                <li v-for="v in 5">
                  <div class="left">
                    <strong class="Price"><b>￥</b>100</strong>
                  </div>
                  <div class="right">
                    <!--可用券-->
                    <i class="steVoucher"></i>
                    <span class="txt">订单满100元</span>
                    <span class="txt">(不含运费)可用</span>
                  </div>
                </li>
              </ul>
            </div>
            <p class="hint">优惠券已放入您的帐户，请在[我的]页面查看</p>
            <i class="exit"></i>
          </div>
        </div>

      </div>
    </article>
    <footer>
      <app-nav ref="appnav" :select-class="'home'"></app-nav>
    </footer>

  </div>

  <!-- 小区列表 -->
  <transition name="SlideRightLeft">
    <div class="wrap fullPosition" v-if="isSelectQuarters">
      <header>
        <div class="header">
          <h2>选择小区</h2>
          <div class="left">
            <div class="back" @click="goSelectQuarters(false)"></div>
          </div>
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
  </transition>


  <!-- 广告图文弹窗 -->
  <transition name="SlideRightLeft">
    <div class="wrap fullPosition" v-if="isToContent">
      <header>
        <div class="header">
          <!--<h2>选择小区</h2>-->
          <div class="left">
            <div class="back" @click="backHome()"></div>
          </div>
        </div>
      </header>
      <article class="main">
        <div class="mainScroll" v-html="toContentHtml"></div>
      </article>
    </div>
  </transition>



  <modal-toast ref="modalToast"></modal-toast>

</div>

</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import slider from './slider.vue';
import appNav from '../common/appNav.vue';
import carCount from '../common/carCount.vue';
import modalToast from '../common/modalToast.vue';

export default {
  name: 'home',
  data() {
    return {
      textCurrentQuarters : simplestorage.get('HLXK_DISTRIBUTION').name || '锦艺测试小区',   // 当前小区
      isSelectQuarters : false,             // 是否显示切换小区
      adLists: [],                          // 广告
      quartersLists : null,                 // 小区列表
      nav:null,                             // 首页菜单
      activityHomeLayoutList : null,        // 首页活动专区2...
      categoryHomeLayoutList : null,        // 首页活动专区1...
      groupBuyList : null,                  // 团购商品
      recommendList : null,                 // 商品推荐
      isToContent:false,                    // 是否显示广告图文
      toContentHtml:''                      // 广告图文内容
    }
  },
  mounted() {
    // 获取初始数据
    this.init();
    // 获取首页菜单
    this.getNav();

    //this.$route.query.projectId

  },
  methods: {
    // 获取初始数据
    init:function(id,callback){
      let _this = this;
      // 小区id
      let distributionCommunityId = id || simplestorage.get('HLXK_DISTRIBUTION').id;
      // 获取首页数据
      this.$http.post('/community/homePage', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId":distributionCommunityId
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res)
        let data = res.data || {};
        if (res.resultCode == 0) {
          _this.adLists = data.advInfos;
          console.log(JSON.stringify(_this.adLists))
          // 活动专区...有的没有这个数据？
          if(data.categoryHomeLayoutList.length > 0) _this.categoryHomeLayoutList = data.categoryHomeLayoutList;
          // 活动专区
          if(data.activityHomeLayoutList.length > 0) _this.activityHomeLayoutList = data.activityHomeLayoutList;
          // 团购商品
          if(data.groupBuy.length > 0) _this.groupBuyList = data.groupBuy.data;
          // 商品推荐
          if(data.recommend.length > 0) _this.recommendList = data.recommend.data;
          //console.log(JSON.stringify(res.data));
          //console.log(JSON.stringify(_this.recommendList));
          //console.log(_this.recommendList);

          // 修改小区后
          callback && callback();
        }else{
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 获取首页菜单
    getNav:function(id,callback){
      let _this = this;
      let distributionCommunityId = id || simplestorage.get('HLXK_DISTRIBUTION').id;

      this.$http.post('/api/getMenu', {
        "projectId":simplestorage.get('projectId'),
        "menuType":1,                                 // 1、个人中心菜单 2 、便利店首页菜单
        "communityId":distributionCommunityId         // 小区ID
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode == 0){
          _this.nav = res.data;
          //console.log(res.data);

          // 修改小区后
          callback && callback();
        }else{
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 是否显示小区列表
    goSelectQuarters:function(is){
      let _this = this;
      if(is){
        // 获取小区列表
        this.$http.post('/community/getDistributionCommunityList', {
          "projectId":simplestorage.get('projectId')
        },{
          "encryptType":1
        }).then(function(res){
          if(res.resultCode != 0){
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
            return false;
          }
          _this.quartersLists = res.data;
          //console.log(res.data);
          //显示列表弹窗
          _this.isSelectQuarters = is;
        }).catch(function(error) {
          console.log(error)
        })
      }else{
        // 关闭列表弹窗
        _this.isSelectQuarters = is;
      }
    },
    // 选择小区
    selectCurrentQuarters:function(data){
      let _this = this;
      // 修改后小区信息后.重新获取数据
      _this.init(data.id,function(){
        // 修改当前小区文字
        _this.textCurrentQuarters = data.name;
        // 保存当前小区信息
        simplestorage.set('HLXK_DISTRIBUTION', data);
        // 关闭列表弹窗
        _this.isSelectQuarters = false;
      });
      // 修改后小区信息后.重新获取菜单
      _this.getNav(data.id,function(){
        // 关闭列表弹窗
        _this.isSelectQuarters = false;
      })
    },
    // 跳转到外部url
    toLink:function(url){
      location.href = url;
    },
    toContent:function(html){
      this.isToContent = true;
      this.toContentHtml = html;
    },
    backHome:function(){
      this.isToContent = false;
    },


    /************************************************************************************************/
    // 修改列表中已添加购物车值
    modifyShopCarCount:function(type,list,index){
      let _this = this;
      Vue.set(_this[list][index],'shopCarCount',_this[list][index]['shopCarCount'] + 1);
    },
    // 修改底部购物车值
    shoppingNum:function(num){
      this.$refs.appnav.shoppingNum = num;
    }

  },
  components: {
    slider,
    appNav,
    carCount,
    modalToast
  }
}
</script>
<style  lang="scss" src="../../assets/styles/index.scss"></style>
<style scoped lang="scss" src="../../assets/styles/_selectQuarters.scss"></style>
<style scoped lang="scss" src="../../assets/styles/_alert.scss"></style>
