<template>
<div class="view">

  <div class="wrap">
    <article class="main">
      <div class="mainScroll index">

        <div class="currentQuarters" @click="goSelectQuarters(true)">
          <span>{{textCurrentQuarters}}</span>
          <i></i>
        </div>

        <slider :items="adLists" :width="640" :height="240" :speed="5000" :sync="true"></slider>

        <div class="indexNav">
          <a href="" class="open">小区开门</a>
          <a href="" class="repair">物业报修</a>
          <a href="" class="complain">投诉建议</a>
          <a href="" class="payment">生活缴费</a>
        </div>

        <div class="activityHomeLayoutList" v-if="activityHomeLayoutList.length > 0">
          <div class="title">
            <h2>活动专区</h2>
          </div>
          <ul>
            <li v-for="list in activityHomeLayoutList">
              <a href="javascript:;" v-if="list.type == 1" @click="toLink(list.link)">
                <img :src="list.imageUrl" alt="自定义url">
              </a>
              <router-link v-else-if="list.type == 3" to="/sale">
                <img :src="list.imageUrl" alt="限时抢购">
              </router-link>
              <router-link v-else-if="list.type == 5" :to="{path:'subject',query: { id: list.link }}">
                <img :src="list.imageUrl" alt="专题活动优惠券活动">
              </router-link>
              <router-link v-else-if="list.type == 6" :to="{path:'commodity',query: { id: list.link }}">
                <img :src="list.imageUrl" alt="商品详情">
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 推荐分类 -->
        <div class="activityHomeLayoutList" v-if="categoryHomeLayoutList.length > 0">
          <ul>
            <li v-for="list in categoryHomeLayoutList" :style="{'width':categoryHomeLayoutList.length == 1 ? '100%' : ''}">
              <a href="">
                <img :src="list.imageUrl" alt="">
              </a>
            </li>
          </ul>
        </div>

        <div class="groupBuy">
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

        <div class="recommend">
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
                  {{list.inventory}}
                  <div class="num" v-if="list.isFlashSale != 1 && list.inventory > 0" @click="add(index,list)">
                  </div>
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
      <app-nav :select-class="'home'" :shoppingNum="shoppingNum"></app-nav>
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


</div>

</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import slider from './slider.vue';
import appNav from '../common/appNav.vue';

export default {
  name: 'home',
  data() {
    return {
      sliderList:[
        {
          image:'http://cms-bucket.nosdn.127.net/4b54654acfbb459f876b7127d448c5da20170407122527.jpeg?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1',
          href:'/home/'
        },
        {
          image:'http://img1.126.net/channel19/027392/750380_0405.jpg',
          href:'/home/'
        }
      ],
      textCurrentQuarters : simplestorage.get('HLXK_DISTRIBUTION').name || '锦艺测试小区',   // 当前小区
      isSelectQuarters : false,             // 是否显示切换小区
      adLists: '',                           // 广告
      quartersLists : null,                 // 小区列表
      activityHomeLayoutList : null,        // 活动专区
      categoryHomeLayoutList : null,        // 活动专区2...
      groupBuyList : null,                  // 团购商品
      recommendList : null,                 // 商品推荐
      shoppingNum:0                         // 购物车数量
    }
  },
  mounted() {
    // 获取初始数据
    this.init();
  },
  methods: {
    // 获取初始数据
    init:function(id,callback){
      let _this = this;
      // 小区id
      let distributionCommunityId = id || simplestorage.get('HLXK_DISTRIBUTION').id;
      // 获取首页数据
      this.$http.post('/community/homePage', {
        "distributionCommunityId":distributionCommunityId
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res)
        let data = res.data || {};
        if (res.resultCode == 0) {
          _this.adLists = data.advInfos;
          // 活动专区...有的没有这个数据？
          _this.categoryHomeLayoutList = data.categoryHomeLayoutList;
          // 活动专区
          _this.activityHomeLayoutList = data.activityHomeLayoutList;
          // 团购商品
          _this.groupBuyList = data.groupBuy.data;
          // 商品推荐
          _this.recommendList = data.recommend.data;
          //console.log(JSON.stringify(res.data));
          console.log(JSON.stringify(_this.recommendList));
          //console.log(_this.adLists);

          // 修改小区后
          callback && callback();
        }else{
          console.log(res.msg);
          alert(res.msg);
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
        },{
          "encryptType":1
        }).then(function(res){
          if(res.resultCode != 0){
            alert('获取小区列表出错！');
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
      // 获取修改后小区信息
      _this.init(data.id,function(){
        // 修改当前小区文字
        _this.textCurrentQuarters = data.name;
        // 保存当前小区信息
        simplestorage.set('HLXK_DISTRIBUTION', data);
        // 关闭列表弹窗
        _this.isSelectQuarters = false;
      });
    },
    // 跳转到外部url
    toLink:function(url){
      location.href = url;
    },
    // 添加购物车
    add:function(index,list){
      // jsp只用到3个值：商品id、商品库存、小区id
      // 已添加到本地的只修改库存数
      // 首页点击的时候如果没有库存了提示
      // 详情页进入的时候没有库存的按钮变为灰色.不添加到购物车？在加入购物车按钮加入购物车...
      // 结算成功需要把购物车中信息删除
      console.log(index);
      console.log(list);
    }
  },
  components: {
    slider,
    appNav
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/index.scss"></style>
<style scoped lang="scss" src="../../assets/styles/_selectQuarters.scss"></style>
<style scoped lang="scss" src="../../assets/styles/_alert.scss"></style>
