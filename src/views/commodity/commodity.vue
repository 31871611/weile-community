<template>
  <div class="wrap">
    <article class="main">
      <div class="mainScroll commodity">

        <div class="commodityPhoto">
          <img :src="list.urls" alt="">
        </div>

        <!-- "isFlash": 0,//是否抢购活动：0不是，1是 -->
        <div v-if="list.isFlash === 1">
          <!-- 抢购倒记时-未开始.当前时间还没到活动开始时间 -->
          <div class="commodityRushTime" v-if="list.nowTime < list.startTime && list.flashSaleInventory > 0">
            <div class="priceNum">
              <span class="price"><b>￥</b>{{list.flashSalePrice / 1000 | price}}</span>
              <div>
                <span class="originalCost">￥{{list.priceYuan | price}}</span>
                <span class="limit" v-if="list.amountLimit">限购{{list.amountLimit}}件</span>
              </div>
            </div>

            <div class="time">
              <p>距开抢 {{countdown}}</p>
              <div class="start">{{list.startTimeStr}}开抢</div>
              <i></i>
            </div>
          </div>

          <!--抢购进行中-->
          <div class="commodityRushGo" v-if="list.nowTime > list.startTime &&list.flashSaleInventory > 0">

            <div class="priceNum">
              <i class="iconClock"></i>
              <div class="endTime">
                <span>距结束</span>
                <span>{{countdown}}</span>
              </div>
            </div>

            <div class="time">
              <p>剩余{{list.flashSaleInventory}}件</p>
              <div class="start">已抢{{list.flashPercent}}%</div>
              <i></i>
            </div>
          </div>

          <div class="commodityRushEnd" v-if="list.flashSaleInventory <= 0">
            <h3>特价库存已被抢光...</h3>
            <p>部分用户未付款，还有机会哦</p>
          </div>
        </div>

        <div class="commodityTitle">
          <h1>{{list.name}}</h1>
          <div class="info">
            <div class="left">
              <div class="priceNum">
                <span class="price"><b>￥</b>{{list.priceYuan | price}}</span>
                <span class="repertory">(库存{{list.inventory}}件)</span>
              </div>
              <span class="originalCost" v-if="list.originalPrice">￥{{list.originalPrice / 1000 | price}}</span>
            </div>
            <div class="right">
              <span class="limit" v-if="list.amountLimit">限购{{list.amountLimit}}件</span>
              <div class="selectNum">
                <div class="reduce"></div>
                <input type="text" value="1" />
                <div class="add"></div>
              </div>
            </div>
          </div>
        </div>

        <ul class="commodityType">
          <li v-if="list.count">销量：{{list.count}}件</li>
          <li v-if="list.spec">规格：{{list.spec}}</li>
        </ul>

        <div class="commodityCue" v-if="false">此商品参与【满20减10】【满50减40】活动</div>
        <div class="commoditySetCoupon" v-for="(coupon,index) in couponList" @click="couponListAlert">
          <b>优惠券{{coupon.couponType}}</b>
          <span>{{coupon.couponName}}</span>
          <i></i>
        </div>

        <div class="commodityContent">
          <h2>图文详情</h2>
          <div class="txt" v-for="txt in list.images">
            <img :src="txt.img" alt="">
            <div class="video" v-if="txt.video">
              <video :src="txt.video" controls="controls">
                您的浏览器不支持 video 标签。
              </video>
            </div>
            <p>{{txt.info}}</p>
          </div>
        </div>

        <!-- 领取优惠券弹窗 -->
        <transition name="SlideBottomTop">
          <div class="commoditySetCouponAlert" v-show="isCouponList">
            <ul>
              <li v-for="(coupon,index) in couponList">
                <div class="left">
                  <strong class="Price"><b>￥</b>{{coupon.faceValue / 1000}}</strong>
                  <span class="txt">订单满{{coupon.orderMoney / 1000}}元</span>
                  <span class="txt">(不含运费)可用</span>
                </div>
                <div class="right">
                  <h3>指定商品使用{{coupon.couponType}}</h3>
                  <em>{{coupon.effectiveTime}} - {{coupon.failureTime}}</em>
                  <!-- getLimit领取数量限制，已领提示：亲~不可多领取哦！ -->
                  <span class="set" :class="{'select':coupon.stock <= 0}" @click="getCoupon(coupon.couponId,coupon.getLimit)">立即领取</span>
                  <!--可用券-->
                  <i class="steVoucher"></i>
                  <!--箭头-->
                  <i class="arrowR"></i>
                </div>
              </li>
            </ul>
            <div class="btn" @click="couponListAlert">
              关闭
            </div>
          </div>
        </transition>

        <!-- 半透明层 -->
        <div class="opacity" v-show="isCouponList" @click="couponListAlert"></div>

      </div>
    </article>
    <footer>
      <div class="commodityFooterNormal">
        <div class="shopping">
          <div><b>1</b></div>
          <span>购物车</span>
        </div>
        <div class="add">
          加入购物车
        </div>
        <div class="pay">
          立即购买
        </div>
      </div>
      <div class="commodityFooterNot">
        <div class="not">已售罄</div>
      </div>
      <div class="commodityFooterBuy">
        <div class="buy">立即购买</div>
      </div>
      <div class="commodityFooterCart">
        <div class="shopping">
          <div><b>1</b></div>
        </div>
        <div class="price">￥21.00</div>
        <div class="add">加入购物车</div>
      </div>

    </footer>
  </div>
</template>
<script type="text/ecmascript-6">
import simplestorage from 'simplestorage.js'

let timer;

export default {
  name: 'commodity',
  data() {
    return {
      list:'',                   // 详情数据
      countdown:'',              // 抢购倒记时
      couponList:'',             // 优惠券列表
      isCouponList:false         // 是否显示优惠券列表
    }
  },
  mounted() {
    let _this = this;

    // 详情数据
    this.$http.post('/community/getCommodityDetail', {
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      "commodityId": this.$route.query.id
    },{
      "encryptType":1
    }).then(function(res) {
      //console.log(res.data);
      if (res.resultCode != 0) {
        alert(res.msg);
        return false;
      }
      _this.list = res.data;
      // 计算倒记时
      _this.computeTime(res.data.nowTime,res.data.startTime,res.data.endTime);
      //console.log(JSON.stringify(res.data));

    }).catch(function(error) {
      console.log(error)
    });

    // 优惠券数据
    this.$http.post('/community/getUsableStoreCoupons', {
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      "goodIds": this.$route.query.id
    },{
      "encryptType":1
    }).then(function(res) {
      //console.log(res.data);
      if (res.resultCode != 0) {
        alert(res.msg);
        return false;
      }
      _this.couponList = res.data;
      console.log(JSON.stringify(_this.couponList));

    }).catch(function(error) {
      console.log(error)
    })

  },
  beforeDestroy:function(){
    clearInterval(timer);
  },
  methods: {
    // 是否显示优惠券列表
    couponListAlert:function(){
      this.isCouponList = !this.isCouponList;
    },
    // 计算抢购倒记时
    computeTime:function(nowTime,startTime,endTime){
      let _this = this;
      if(startTime === 0 && endTime === 0){
        return false;
      }

      timer = setInterval(function(){
        // 现在时间大于活动结束时间
        if(startTime > endTime){
          console.log('活动已结束！');
          return false;
        }
        // 剩余时间.结束时间-现在时间
        let surplus = endTime - nowTime;
        // 系统时间加一秒
        nowTime = nowTime + 1000;
        // 剩余时间小于等于0
        if(surplus<=0){
          clearInterval(timer);
          console.log('活动已结束！');
          return false;
        }
        //console.log('剩余：'+surplus);

        let ds = 60*60*24*1000,
          d = parseInt(surplus/ds),
          h = parseInt((surplus-d*ds)/(60*60*1000)),
          m = parseInt((surplus - d*ds - h*3600*1000)/(60*1000)),
          s = parseInt((surplus-d*ds-h*3600*1000-m*60*1000)/1000);
        //console.log(d + '天' + h + '小时' + m + '分' + s + '秒');
        if(h < 10) h = '0' + h;
        if(m < 10) m = '0' + m;
        if(s < 10) s = '0' + s;

        _this.countdown = d+'天'+h+':'+m+':'+s;
        //console.log(_this.countdown);
      },1000);
    },
    // 领取优惠券
    getCoupon:function(id,limit){
      alert(id + '|' + limit);

      this.$http.post('/community/getStoreCouponToUser', {
        "storeId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "couponId": id
      },{
        "encryptType":1
      }).then(function(res) {
        console.log(res);
        if (res.resultCode != 0) {
          alert(res.msg);
          return false;
        }
        //_this.couponList = res.data;
        //console.log(JSON.stringify(_this.couponList));

      }).catch(function(error) {
        console.log(error)
      })

    }
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/commodity.scss"></style>
