<template>
<div class="view">

  <div class="wrap">
    <article class="main">
      <div class="mainScroll index">
        <div class="defaultAd" v-if="adLists.length == 0">
          <img :src="defaultAd" alt="">
        </div>
        <!-- 轮播 -->
        <slider v-show="adLists.length > 0" @toContent="toContent" :items="adLists" :width="640" :height="240" :speed="5000"></slider>

        <!-- 选择小区 -->
        <div class="quartersShow">
          <router-link class="txt" :to="{path:'quartersList',query:{projectId:projectId}}">{{textCurrentQuarters}} ></router-link>
          <!--<div class="txt" @click="goSelectQuarters(true)">{{textCurrentQuarters}} ></div>-->
          <div class="map"><i></i></div>
        </div>

        <!-- 菜单 -->
        <div class="indexNav">
          <a :href="list.menuUrl" v-for="list in nav" :class="list.icon">{{list.menuName}}</a>
        </div>

        <!-- 通知 -->
        <div class="notice">
          <i></i>
          <a :href="announcement.announcementDetailUrl" class="scrollConter" ref="scrollConter">
            <span class="begin">{{announcement.title}}</span>
            <span class="end"></span>
          </a>
          <a class="url" :href="announcement.announcementListUrl">更多</a>
        </div>

        <!-- 首页活动推荐1 -->
        <div class="activityHomeLayoutList" v-if="categoryHomeLayoutList">
          <div class="title">
            <span class="line"></span><h2>{{categoryHomeLayoutList[0].title}}</h2><span class="line"></span>
          </div>
          <ul>
            <li v-for="list in categoryHomeLayoutList" :class="'style' + list.styleCode">
              <a :href="list.link" v-if="list.type == 1">
                <img :src="list.imageUrl" :title="list.title" alt="自定义url">
              </a>
              <router-link v-else-if="list.type == 2" :to="{path:'store',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="便利店.分类">
              </router-link>
              <router-link v-else-if="list.type == 3" :to="{path:'/sale',query:{projectId:projectId}}">
                <img :src="list.imageUrl" :title="list.title" alt="限时抢购">
              </router-link>
              <router-link v-else-if="list.type == 4" :to="{path:'fullDiscount',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品优惠活动">
              </router-link>
              <router-link v-else-if="list.type == 5 && list.thematicType == 1" :to="{path:'subject',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品专题">
              </router-link>
              <router-link v-else-if="list.type == 5 && list.thematicType == 2" :to="{path:'subjectCoupon',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="优惠券专题">
              </router-link>
              <router-link v-else-if="list.type == 6" :to="{path:'commodity',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品详情">
              </router-link>
              <router-link v-else-if="list.type == 7" :to="{path:'subjectCoupon',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="优惠券专题">
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 首页活动推荐2 -->
        <div class="activityHomeLayoutList" v-if="activityHomeLayoutList">
          <div class="title">
            <span class="line"></span><h2>{{activityHomeLayoutList[0].title}}</h2><span class="line"></span>
          </div>
          <ul>
            <li v-for="list in activityHomeLayoutList" :class="'style' + list.styleCode">
              <a :href="list.link" v-if="list.type == 1">
                <img :src="list.imageUrl" :title="list.title" alt="自定义url">
              </a>
              <router-link v-else-if="list.type == 2" :to="{path:'store',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="便利店.分类">
              </router-link>
              <router-link v-else-if="list.type == 3" :to="{path:'/sale',query:{projectId:projectId}}">
                <img :src="list.imageUrl" :title="list.title" alt="限时抢购">
              </router-link>
              <router-link v-else-if="list.type == 4" :to="{path:'fullDiscount',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品优惠活动">
              </router-link>
              <router-link v-else-if="list.type == 5 && list.thematicType == 1" :to="{path:'subject',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品专题">
              </router-link>
              <router-link v-else-if="list.type == 5 && list.thematicType == 2" :to="{path:'subjectCoupon',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="优惠券专题">
              </router-link>
              <router-link v-else-if="list.type == 6" :to="{path:'commodity',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="商品详情">
              </router-link>
              <router-link v-else-if="list.type == 7" :to="{path:'subjectCoupon',query: { id: list.link,projectId:projectId }}">
                <img :src="list.imageUrl" :title="list.title" alt="优惠券专题">
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 团购 -->
        <div class="groupBuy" v-if="groupBuyList">
          <div class="title">
            <span class="line"></span><h2>团购</h2><span class="line"></span>
          </div>
          <div class="scroll">
            <ul>
              <li v-for="list in groupBuyList">
                <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}">
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

        <!-- 精选 -->
        <template v-if="selectedList">
          <div class="selectedList" v-for="(lists,parentIndex) in selectedList">
            <div class="title">
              <template v-if="lists.showName == 1">
                <span class="line"></span>
                <h2>{{lists.title}}</h2>
                <span class="line"></span>
              </template>
              <!--
                  "moreType": 1, //1.便利店首页 2.商品分类 3限时抢购  4商品优惠  5商品专题 6优惠券专题
                  "moreTypeId": 1,//1和moretypeid对应  1为空 2商品分类id 3为空 4商品优惠id 5，6专题活动id
              -->
              <template v-if="lists.showMore == 1">
                <router-link v-if="lists.moreType == 1" :to="{path:'store',query:{projectId:projectId}}" class="more">更多<i></i></router-link>
                <router-link v-else-if="lists.moreType == 2" :to="{path:'store',query:{id: lists.moreTypeId,projectId:projectId}}" class="more">更多<i></i></router-link>
                <router-link v-else-if="lists.moreType == 3" :to="{path:'sale',query:{projectId:projectId}}" class="more">更多<i></i></router-link>
                <router-link v-else-if="lists.moreType == 4" :to="{path:'fullDiscount',query:{id: lists.moreTypeId,projectId:projectId}}" class="more">更多<i></i></router-link>
                <router-link v-else-if="lists.moreType == 5" :to="{path:'subject',query:{id: lists.moreTypeId,projectId:projectId}}" class="more">更多<i></i></router-link>
                <router-link v-else-if="lists.moreType == 6" :to="{path:'subjectCoupon',query:{id: lists.moreTypeId,projectId:projectId}}" class="more">更多<i></i></router-link>
              </template>

            </div>
            <ul>
              <li v-for="(list,index) in lists.appStorePositionImageDtoList" :class="'style' + list.positionType">
                <div class="box" :class="{'ml':list.positionType == 2 && list.positionType % 1}">
                  <router-link :to="{path:'commodity',query: { id: list.typeId,projectId:projectId }}">
                    <img :src="list.url" alt="">
                    <p>{{list.goodsName}}</p>
                    <div class="bottom">
                      <strong class="price">￥<b>{{list.price / 1000}}</b></strong>
                      <car-count ref="carcount" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.showBuy == 1" :index="index" :parent-index="parentIndex" :list="'selectedList'" :commodity-id="list.commodityPageInfoDto.commodityId" :shop-car-count="list.commodityPageInfoDto.shopCarCount" :inventory="list.commodityPageInfoDto.inventory"></car-count>
                    </div>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <div class="selectedList" v-if="isStore">
          <div class="not">
            <i></i>
            <p>当前小区暂无好货上架</p>
          </div>
        </div>

        <!-- 推荐列表 -->
        <div class="recommend" v-if="recommendList">
          <div class="title">
            <span class="line"></span><h2>推荐商品</h2><span class="line"></span>
            <router-link to="store" class="more">更多<i></i></router-link>
          </div>
          <ul>
            <li v-for="(list,index) in recommendList">
              <div class="content">
                <i class="activity" v-if="list.isActivity == 1">活动</i>
                <i class="goIng" v-if="list.isFlashSale == 1 && list.flashSaleStatus == 1">抢购中</i>
                <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}" class="photo">
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

                  <car-count ref="carcount" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.isFlashSale != 1 && list.inventory > 0" :index="index" :list="'recommendList'" :commodity-id="list.commodityId" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                </div>
              </div>
            </li>

          </ul>
        </div>

        <!-- 领取优惠券弹窗 -->
        <div class="opacity" v-if="isCoupon"></div>
        <div class="indexSetCouponAlert" v-if="isCoupon">
          <div class="box">
            <div class="bg"></div>
            <div class="list">
              <ul>
                <li v-for="(list,index) in coupon.dataList">
                  <a href="javascript:;">
                    <div class="left">
                      <strong class="Price"><b>￥</b>{{list.faceValue / 1000}}</strong>
                    </div>
                    <div class="right">
                      <!--可用券-->
                      <i class="steVoucher"></i>
                      <span class="txt">订单满{{list.orderMoney / 1000}}元</span>
                      <span class="txt">(不含运费)可用</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <p class="hint">优惠券已放入您的帐户，请在[我的]页面查看</p>
            <i class="exit" @click="exitCoupon()"></i>
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

  <transition name="SlideRightLeft">
    <router-view></router-view>
  </transition>

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
      projectId:simplestorage.get('projectId'),
      textCurrentQuarters : simplestorage.get('HLXK_DISTRIBUTION').name || '锦艺测试小区',   // 当前小区
      isSelectQuarters : false,             // 是否显示切换小区
      adLists: [],                          // 广告
      defaultAd:'./static/images/defaultAd.png',    // 默认广告图
      quartersLists : null,                 // 小区列表
      nav:null,                             // 首页菜单
      announcement:'',                      // 公告消息
      activityHomeLayoutList : null,        // 首页活动专区2...
      categoryHomeLayoutList : null,        // 首页活动专区1...
      selectedList:null,                    // 精选
      groupBuyList : null,                  // 团购商品
      recommendList : null,                 // 商品推荐
      isToContent:false,                    // 是否显示广告图文
      toContentHtml:'',                     // 广告图文内容
      coupon:null,                          // 优惠券数据
      isCoupon:false,                       // 优惠券弹窗
      isStore:false                         // 无便利店，显示图标
    }
  },
  mounted() {
    // 获取初始数据
    this.init();
    // 获取首页菜单
    this.getNav();
    // 获取优惠券
    this.getCoupon();

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
        "distributionCommunityId":distributionCommunityId,
        "deliveryChannel":2             // 轮播广告: 2微信
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res)
        let data = res.data || {};
        //console.log(JSON.stringify(res.data));
        if (res.resultCode == 0) {
          // 显示无便利提示图标
          _this.isStore = false;
          // 轮播广告
          if(data.advInfos.length > 0) _this.adLists = data.advInfos;
          // 公告消息
          _this.announcement = data.announcement;
          // 精选列表
          if(data.storeSelectionDtoList.length > 0) _this.selectedList = data.storeSelectionDtoList;
          // 活动专区...有的没有这个数据？
          if(data.categoryHomeLayoutList.length > 0) _this.categoryHomeLayoutList = data.categoryHomeLayoutList;
          // 活动专区
          if(data.activityHomeLayoutList.length > 0) _this.activityHomeLayoutList = data.activityHomeLayoutList;
          // 团购商品
          if(data.groupBuy.data.length > 0) _this.groupBuyList = data.groupBuy.data;
          // 商品推荐
          if(data.recommend.data.length > 0) _this.recommendList = data.recommend.data;

          // 滚动公告
          _this.$nextTick(function(){
            _this.scrollLeft();
          });

          //console.log(JSON.stringify(_this.selectedList));

        }else if(res.resultCode == 7001){
          // 显示无便利提示图标
          _this.isStore = true;
          /* 清空... */
          _this.adLists = [];
          // 公告消息
          _this.announcement = false;
          // 精选列表
          _this.selectedList = false;
          // 活动专区...有的没有这个数据？
          _this.categoryHomeLayoutList = false;
          // 活动专区
          _this.activityHomeLayoutList = false;
          // 团购商品
          _this.groupBuyList = false;
          // 商品推荐
          _this.recommendList = false;

        }else{
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
        }

        // 修改小区后
        callback && callback();
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
        "menuType":2,                                 // 1、个人中心菜单 2 、便利店首页菜单
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
    // 获取优惠券
    getCoupon:function(id){
      let _this = this;
      let distributionCommunityId = id || simplestorage.get('HLXK_DISTRIBUTION').id;

      this.$http.post('/community/listLatelyLatelyCardCouonPush', {
        "projectId":simplestorage.get('projectId'),
        "communityId":distributionCommunityId         // 小区ID
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode == 0){
          if(res.data.dataList.length > 0){
            _this.coupon = res.data;
            // 显示弹窗
            _this.isCoupon = true;
          }
        }else{
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
        }
      }).catch(function(error) {
        console.log(error)
      })

    },
    // 滚动公告
    scrollLeft:function(){
      let scrollConter = this.$refs.scrollConter;
      let begin = scrollConter.querySelector('.begin');
      let end = scrollConter.querySelector('.end');
      if(begin.clientWidth > scrollConter.clientWidth){
        end.innerHTML = begin.innerHTML;
        function Marquee() {
          if (end.offsetWidth - scrollConter.scrollLeft <= 0){
            scrollConter.scrollLeft -= begin.offsetWidth;
          }else{
            scrollConter.scrollLeft++;
          }
        }
        let MyMar = setInterval(Marquee, 50);
      }
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
    // 广告自定义html
    toContent:function(html){
      this.isToContent = true;
      this.toContentHtml = html;
    },
    // 选择小区返回
    backHome:function(){
      this.isToContent = false;
    },
    // 关闭优惠券弹窗
    exitCoupon:function(){
      this.isCoupon = false;
    },
    /************************************************************************************************/
    // 修改列表中已添加购物车值
    modifyShopCarCount:function(type,list,index,parentIndex){
      let _this = this;

      // 精选
      if(list == 'selectedList'){
        Vue.set(_this[list][parentIndex]['appStorePositionImageDtoList'][index]['commodityPageInfoDto'],'shopCarCount',_this[list][parentIndex]['appStorePositionImageDtoList'][index]['commodityPageInfoDto']['shopCarCount'] + 1);
      }else{
        Vue.set(_this[list][index],'shopCarCount',_this[list][index]['shopCarCount'] + 1);
      }
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
<style scoped lang="scss" src="../../assets/styles/index.scss"></style>
<style scoped lang="scss" src="../../assets/styles/_selectQuarters.scss"></style>
<style scoped lang="scss" src="../../assets/styles/_alert.scss"></style>
