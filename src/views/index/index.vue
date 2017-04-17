<template>
<div class="view">

  <div class="wrap">
    <article class="main">
      <div class="mainScroll index">

        <div class="currentQuarters" @click="goSelectQuarters(true)">
          <span>{{textCurrentQuarters}}</span>
          <i></i>
        </div>

        <slider :items="sliderList" :width="640" :height="240" :speed="5000" :sync="true"></slider>

        <div class="indexNav">
          <a href="" class="open">小区开门</a>
          <a href="" class="repair">物业报修</a>
          <a href="" class="complain">投诉建议</a>
          <a href="" class="payment">生活缴费</a>
        </div>

        <div class="categoryHomeLayoutList">
          <ul>
            <li v-for="list in categoryHomeLayoutList">
              <a href="">
                <img :src="list.imageUrl" alt="">
              </a>
            </li>
          </ul>
        </div>

        <div class="groupBuy">
          <div class="title">
            <h2>团购</h2>
            <a href="" class="more">更多<i></i></a>
          </div>
          <div class="scroll">
            <ul>
              <li v-for="list in groupBuyList">
                <a href="">
                  <img :src="list.url" alt="">
                  <h3>{{list.name}}</h3>
                  <div class="price">
                    <b>￥</b><strong>{{list.priceYuan}}</strong>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="recommend">
          <div class="title">
            <h2>推荐商品</h2>
            <a href="" class="more">更多<i></i></a>
          </div>
          <ul>
            <li v-for="list in recommendList">
              <div class="content">
                <i class="activity">活动</i>
                <i class="goIng">抢购中</i>
                <router-link :to="{path:'commodity/' + list.commodityId}" class="photo">
                  <img :src="list.url" :alt="list.commodityId">
                </router-link>
                <h3>{{list.name}}</h3>
                <div class="bottom">
                  <div class="price">
                    <b>￥</b><strong>{{list.priceYuan}}</strong>
                  </div>
                  <div class="go">
                    马上抢
                  </div>
                  <div class="num">
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
      <app-nav :select-class="'home'"></app-nav>
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
            <li v-for="(list, index) in lists" @click="selectCurrentQuarters(lists[index])">{{list.name}}</li>
          </ul>
        </div>
      </article>
    </div>
  </transition>
</div>

</template>
<script type="text/ecmascript-6">
import simplestorage from 'simplestorage.js'
import slider from './slider.vue';
import appNav from '../common/appNav.vue';

export default {
  name: 'home',
  data() {
    return {
      sliderList:[
        {src:'http://cms-bucket.nosdn.127.net/4b54654acfbb459f876b7127d448c5da20170407122527.jpeg?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1',href:'/home/'},
        {src:'http://img1.126.net/channel19/027392/750380_0405.jpg',href:'/home/'}
      ],
      textCurrentQuarters : '锦艺测试小区',   // 当前小区
      isSelectQuarters : false,             // 是否显示切换小区
      lists : null,                         // 小区列表
      categoryHomeLayoutList : null,        // 活动专区
      groupBuyList : null,                  // 团购商品
      recommendList : null                  // 商品推荐
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
      let distributionCommunityId = id || 1;
      // 获取首页数据
      this.$http.post('/community/homePage', {
        "distributionCommunityId":distributionCommunityId
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res)
        let data = res.data || {};
        if (res.resultCode == 0) {

          // 活动专区
          _this.categoryHomeLayoutList = data.categoryHomeLayoutList;
          // 团购商品
          _this.groupBuyList = data.groupBuy.data;
          // 商品推荐
          _this.recommendList = data.recommend.data;
          //console.log(JSON.stringify(_this.recommendList));
          //console.log(data.categoryHomeLayoutList);

          // 修改小区后
          callback && callback();
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
          _this.lists = res.data;
          console.log(res.data);
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
    }
  },
  components: {
    slider,
    appNav
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/index.scss"></style>
