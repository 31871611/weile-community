<template>
<div class="view">
  <div class="wrap">

    <article class="main">
      <div class="mainScroll payOrder">
        <div class="payOrderTitle">
          配送地址
        </div>

        <ul class="defaultAddress">
          <li>
            <router-link to="userAddress">
              <template v-if="address">
                <div><span class="name">{{address.name}}</span><span class="tel">{{address.mobile}}</span></div>
                <p>{{address.communityName}} | {{address.address}}</p>
                <i class="auth" v-if="address.isAuthenAddress"></i>
              </template>
              <template v-else>
                请选择收货地址
                <i class="arrowR"></i>
              </template>
            </router-link>
          </li>
        </ul>

        <div class="payOrderTime">
          <span class="fl">送达时间</span>
          <span class="fr">尽快送达</span>
        </div>
        <div class="payOrderTextarea" contenteditable="true">
          点击添加留言
        </div>

        <div class="payOrderTitle">
          采购清单
        </div>
        <div class="goodsList">
          <ul>
            <li v-for="list in lists.goodsList">
              <a href="javascript:;" class="photo">
                <img :src="list.imageUrl" alt="">
              </a>
              <div class="box">
                <h3>{{list.goodsName}}</h3>
                <div class="bottom">
                  <strong class="price">￥{{list.price / 1000 | price}}</strong>
                  <span class="num">x{{list.amount}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>


        <ul class="payOrderInfo">

          <li v-for="list in lists.giftsList">
            <i class="give">赠</i>
            <span>{{list.giftName}}</span>
            <strong>￥10.00</strong>
          </li>

          <li>
            <span>胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶</span>
            <strong>￥10.00</strong>
          </li>
          <li>
            <span>优惠方式二：满5件打5折</span>
            <strong>-￥10.00</strong>
          </li>
          <li v-if="lists.distributionAmount">
            <span>配送费：</span>
            <strong>￥{{lists.distributionAmount / 1000 | price}}</strong>
          </li>
          <li @click="couponAlert" if="lists.couponList.length > 0">
            <template v-if="isUseCoupon">
              <span><b>不使用优惠券</b></span>
            </template>
            <template v-else>
              <!-- lists.couponList[0]报错... -->
              <span><b>{{couponPrice / 1000 }}元优惠券</b></span>
              <strong>-￥{{couponPrice / 1000 | price}}</strong>
            </template>
            <i class="arrowR"></i>
          </li>
          <li>
            <span class="prompt">共计{{lists.goodsNum}}件商品</span>
            <strong>合计：<b>￥{{(lists.totalAmount - couponPrice) / 1000 | price}}</b></strong>
          </li>
        </ul>

        <!-- 半透明遮罩 -->
        <div class="opacity" v-if="isCouponAlert" @click="couponAlert"></div>

        <transition name="SlideBottomTop">
          <!-- 订单可用优惠券弹窗 -->
          <div class="availableCouponAlert" v-if="isCouponAlert">
            <h2>订单可用优惠券弹窗</h2>
            <ul>
              <li v-for="(list,index) in lists.couponList" v-if="list.orderMoney < lists.payAmount" @click="selectCoupon(index,list.faceValue)">
                <label>
                  <span :class="{'select':index == couponIndex}">{{list.faceValue / 1000}}元优惠券</span>
                  <i class="radio" :class="{'select':index == couponIndex}"></i>
                </label>
              </li>
              <li @click="selectCoupon(-1,'不使用优惠券')">
                <label>
                  <span :class="{'select':-1 == couponIndex}">不使用优惠券</span>
                  <i class="radio" :class="{'select':-1 == couponIndex}"></i>
                </label>
              </li>
            </ul>
            <div class="btn" @click="couponAlert">关闭</div>
          </div>
        </transition>


      </div>
    </article>
    <footer>
      <div class="footerCart">
        <div class="total">
          还需支付：<b>￥{{(lists.payAmount - couponPrice) / 1000 | price}}</b>
        </div>
        <div class="next">立即下单</div>
      </div>
    </footer>
  </div>

  <router-view></router-view>
</div>
</template>
<script>
/*

 "payAmount": 120000,
 "totalAmount": 120000,

 "activityList": [],        // 活动
 "giftsList": [],           // 赠品
 "isFlashOrder": "0",       // 是否抢购订单，0否，1是
 "isNewUser": 0             // 是否新用户，1是，0不是

*/
import simplestorage from 'simplestorage.js'

export default {
  name: 'payOrder',
  data() {
    return{
      address:'',                 // 默认地址
      lists:'',                   // 结算信息
      isUseCoupon:false,          // 是否使用优惠券
      couponIndex:0,              // 优惠券列表索引
      couponPrice:'',             // 选中优惠券价格
      isCouponAlert:false         // 是否显示优惠券弹窗

    }
  },
  mounted() {
    let _this = this;

    _this.getData();
    _this.getDefaultAddress();
  },
  methods: {
    getData() {
      let _this = this;

      // 获取结算信息
      this.$http.post('/community/getPayInfo', {
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "goodsInfo":"[{goodsId:100341,price:60000,amount:1},{goodsId:2333,price:60000,amount:1}]",
        "isFlashOrder":0  //是否抢购商品：1是，0否
      },{
        "encryptType":1
      }).then(function(res){
        console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.lists = res.data;
        _this.couponPrice = res.data.couponList[0].faceValue
        console.log(JSON.stringify(_this.lists));

      }).catch(function(error) {
        console.log(error)
      })

    },
    // 获取默认地址
    getDefaultAddress:function(){
      let _this = this;

      // 默认地址
      this.$http.post('/community/getDefaultAddress', {
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.address = res.data;
        //console.log(JSON.stringify(_this.address));
      }).catch(function(error) {
        console.log(error)
      })

    },
    // 优惠券弹窗
    couponAlert:function(){
      this.isCouponAlert = !this.isCouponAlert
    },
    // 选择优惠券
    selectCoupon:function(index,faceValue){
      this.couponIndex = index;
      if(faceValue == '不使用优惠券'){
        // 不使用优惠券
        this.isUseCoupon = true
        this.couponPrice = 0;
      }else{
        this.isUseCoupon = false;
        this.couponPrice = faceValue;
      }
      // 关闭优惠券弹窗
      this.isCouponAlert = !this.isCouponAlert
    }
  },
  components: {

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/payOrder.scss"></style>
