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
            <router-link :to="{path:'payorder/address',query:{source:'payorder'}}">
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

          <li v-for="list in lists.activityList">
            <span>{{list.activityName}}</span>
            <span>{{list.discountStr}}</span>
            <strong>￥{{list.discountMoney}}</strong>
          </li>
          <li v-if="lists.distributionAmount">
            <span>配送费：</span>
            <strong>￥{{lists.distributionAmount / 1000 | price}}</strong>
          </li>
          <li @click="couponAlert" if="lists.couponList.length > 0">
            <template v-if="coupon.isUse">
              <span><b>不使用优惠券</b></span>
            </template>
            <template v-else>
              <span><b>{{coupon.price / 1000 }}元优惠券</b></span>
              <strong>-￥{{coupon.price / 1000 | price}}</strong>
            </template>
            <i class="arrowR"></i>
          </li>
          <li>
            <span class="prompt">共计{{lists.goodsNum}}件商品</span>
            <strong>合计：<b>￥{{(lists.totalAmount - coupon.price) / 1000 | price}}</b></strong>
          </li>
        </ul>

        <!-- 半透明遮罩 -->
        <div class="opacity" v-if="coupon.isAlert" @click="couponAlert"></div>

        <transition name="SlideBottomTop">
          <!-- 订单可用优惠券弹窗 -->
          <div class="availableCouponAlert" v-if="coupon.isAlert">
            <h2>订单可用优惠券弹窗</h2>
            <ul>
              <li v-for="(list,index) in lists.couponList" v-if="list.orderMoney < lists.payAmount" @click="selectCoupon(index,list.faceValue)">
                <label>
                  <span :class="{'select':index == coupon.index}">{{list.faceValue / 1000}}元优惠券</span>
                  <i class="radio" :class="{'select':index == coupon.index}"></i>
                </label>
              </li>
              <li @click="selectCoupon(-1,'不使用优惠券')">
                <label>
                  <span :class="{'select':-1 == coupon.index}">不使用优惠券</span>
                  <i class="radio" :class="{'select':-1 == coupon.index}"></i>
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
          还需支付：<b>￥{{(lists.payAmount - coupon.price) / 1000 | price}}</b>
        </div>
        <div class="next">立即下单</div>
      </div>
    </footer>
  </div>

  <transition name="SlideRightLeft">
    <router-view></router-view>
  </transition>

</div>
</template>
<script>
/*

  商品、地址、抢购


 "payAmount": 120000,       // 支付金额
 "totalAmount": 120000,     // 全部商品总价

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
      coupon:{
        isUse:false,              // 是否使用优惠券
        index:0,                  // 优惠券列表索引
        price:'',                 // 选中优惠券价格
        isAlert:false             // 是否显示优惠券弹窗
      }
    }
  },
  mounted() {
    let _this = this;

    _this.getData();
    _this.getDefaultAddress();
  },
  methods: {
    // 获取结算信息
    getData() {
      let _this = this;

      this.$http.post('/community/getPayInfo', {
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "goodsInfo":"[{goodsId:100341,price:60000,amount:1},{goodsId:2333,price:60000,amount:1}]",
        "isFlashOrder":0        //是否抢购商品：1是，0否
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.lists = res.data;
        _this.coupon.price = res.data.couponList[0].faceValue
        //console.log(JSON.stringify(_this.lists));

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
    // 修改地址
    modifyAddress:function(){

    },
    // 优惠券弹窗
    couponAlert:function(){
      this.coupon.isAlert = !this.coupon.isAlert
    },
    // 选择优惠券
    selectCoupon:function(index,faceValue){
      this.coupon.index = index;
      if(faceValue == '不使用优惠券'){
        // 不使用优惠券
        this.coupon.isUse = true;
        this.coupon.price = 0;
      }else{
        this.coupon.isUse = false;
        this.coupon.price = faceValue;
      }
      // 关闭优惠券弹窗
      this.coupon.isAlert = !this.coupon.isAlert
    }
  },
  components: {

  },
  watch: {
    '$route' () {

      if(this.$route.query.address){
        this.address = JSON.parse(this.$route.query.address);
      }

    }
  }
}
/*




*/
</script>
<style scoped lang="scss" src="../../assets/styles/payOrder.scss"></style>
