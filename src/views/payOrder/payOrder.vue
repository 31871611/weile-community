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
            <router-link :to="{path:'payorder/address',query:{source:'payorder',goodsInfo:goodsInfo ,isGroupBuyingOrder:isGroupBuyingOrder ,isFlashOrder:isFlashOrder,projectId:projectId}}">
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

        <div class="payOrderTextarea">
          <textarea v-model="comments" @focus="commentsFocus" @blur="commentsBlur"></textarea>
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
                <a href="javascript:;">
                  <h3>{{list.goodsName}}</h3>
                  <div class="bottom">
                    <strong class="price">￥{{list.price / 1000 | price}}</strong>
                  </div>
                  <span class="num">x{{list.amount}}</span>
                </a>
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

          <li @click="couponAlert" v-if="coupon.is">
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
            <!--<strong>合计：<b>￥{{(lists.totalAmount - coupon.price + lists.distributionAmount) / 1000 | price}}</b></strong>-->
            <strong>合计：<b>￥{{(lists.payAmount - coupon.price) / 1000 | price}}</b></strong>
          </li>
        </ul>

        <!-- 半透明遮罩 -->
        <div class="opacity" v-if="coupon.isAlert" @click="couponAlert"></div>

        <transition name="SlideBottomTop">
          <!-- 订单可用优惠券弹窗 -->
          <div class="availableCouponAlert" v-if="coupon.isAlert">
            <h2>订单可用优惠券弹窗</h2>
            <ul>
              <li v-for="(list,index) in lists.couponList" v-if="list.orderMoney < lists.payAmount" @click="selectCoupon(index,list.faceValue,list.userCardId)">
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

        <modalToast ref="modalToast"></modalToast>

      </div>
    </article>
    <footer>
      <div class="footerCart">
        <div class="total">
          还需支付：<b>￥{{(lists.payAmount - coupon.price) / 1000 | price}}</b>
        </div>
        <div class="next" @click="submit()">立即下单</div>
      </div>
    </footer>
  </div>

  <transition name="SlideRightLeft">
    <router-view :goodsInfo="goodsInfo" :isGroupBuyingOrder="isGroupBuyingOrder" :isFlashOrder="isFlashOrder"></router-view>
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
import modalToast from '../common/modalToast.vue'

export default {
  name: 'payOrder',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      isGroupBuyingOrder:this.$route.query.isGroupBuyingOrder,
      isFlashOrder:this.$route.query.isFlashOrder,
      goodsInfo:this.$route.query.goodsInfo,
      address:'',                 // 默认地址
      lists:'',                   // 结算信息
      coupon:{
        is:false,                 // 无优惠券不显示
        isUse:false,              // 是否使用优惠券
        index:0,                  // 优惠券列表索引
        price:'',                 // 选中优惠券价格
        isAlert:false,            // 是否显示优惠券弹窗
        userCardId:null           // 需要传null
      },
      comments:'点击添加留言'
    }
  },
  created() {

    //console.log(this.$route.query.goodsInfo)

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

      //let goods = "[{goodsId:100341,price:60000,amount:1},{goodsId:2333,price:60000,amount:1}]";

      this.$http.post('/community/getPayInfo', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "goodsInfo":_this.goodsInfo,
        "isFlashOrder":_this.isFlashOrder,                       //是否抢购商品：1是，0否
        "isGroupBuyingOrder":_this.isGroupBuyingOrder            //是否团购：1是，0否
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode != 0){
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
          return false;
        }
        _this.lists = res.data;
        // 优惠券
        if(_this.lists.couponList.length > 0){
          _this.coupon.is = true;
          _this.coupon.price = _this.lists.couponList[0].faceValue
          _this.coupon.userCardId = _this.lists.couponList[0].userCardId
        }
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
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode == 0){
          _this.address = res.data;
        }else{
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
        }
        //console.log(JSON.stringify(_this.address));
      }).catch(function(error) {
        console.log(error)
      })

    },
    // 修改地址
    modifyAddress:function(){

    },
    // 留言
    commentsFocus:function(){
      if(this.comments == "点击添加留言"){
        this.comments = "";
      }
    },
    commentsBlur:function(){
      if(this.comments == ""){
        this.comments = "点击添加留言"
      }
    },
    // 优惠券弹窗
    couponAlert:function(){
      this.coupon.isAlert = !this.coupon.isAlert
    },
    // 选择优惠券
    selectCoupon:function(index,faceValue,userCardId){
      this.coupon.index = index;
      if(faceValue == '不使用优惠券'){
        // 不使用优惠券
        this.coupon.isUse = true;
        this.coupon.price = 0;
        this.coupon.userCardId = null;
      }else{
        this.coupon.isUse = false;
        this.coupon.price = faceValue;
        this.coupon.userCardId = userCardId;
      }
      // 关闭优惠券弹窗
      this.coupon.isAlert = !this.coupon.isAlert
    },
    // 提交
    submit:function(){
      let _this = this;

/*
      var payAmount = +$this.data('payamount');
      if( payAmount <= 0 ) return $.toast('抱歉，无法下单');
      if($this.attr('disabled')) return;
      $this.attr('disabled', 'disabled');

      var consignee = $('#consignee').val();			收货人
      var address = $('#address').val();				小区+详细地址
      var mobile = $('#mobile').val();				手机号
      if(consignee==""||address==""||mobile==""){
        $.toast('请选择配送地址');
        return;
      }
*/

      if(_this.address == ""){
        _this.$refs.modalToast.toast({
          txt:"请选择配送地址"
        });
        return false;
      }

      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });

      let comments = this.comments == "点击添加留言" ? "" : this.comments;

      this.$http.post('/community/createStoreOrder', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "consignee": _this.address.name,                                  // 收货人
        "address": _this.address.communityName + _this.address.address,   // 小区+详细地址
        "mobile": _this.address.mobile,                                   // 手机号
        "expectedTimeType": 1,                                            // 不知道是什么，写死的，1
        "payMethod": 2,                                                   // 不知道是什么，写死的，2
        "isGroupBuyingOrder":_this.isGroupBuyingOrder,       // 是否团购：1是，0否
        "goodsInfo": _this.goodsInfo,                        // 商品信息
        "comments": comments,                                             // 留言
        "isFlashOrder":_this.isFlashOrder,                   // 是否抢购商品：1是，0否
        "userCardPackageId": _this.coupon.userCardId
      },{
        "encryptType":1
      }).then(function(res){
        console.log(res);
        if(res.resultCode == 0){
          let orderId = res.data.orderId;
          let url = location.protocol + '//' + location.host + '/#/success?projectId=1';

          // 下单成功，调用支付接口
          _this.$http.post('/community/collectionPay', {
            "projectId":simplestorage.get('projectId'),
            "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
            "orderId":orderId,
            "callbackUrl":url
          },{
            "encryptType":0
          }).then(function(res){
            //console.log(res);
            if(res.resultCode == 0){
              //alert(JSON.stringify(res.data));
              // 跳转去支付
              location.href = res.data.payUrl;
              // 隐藏加载中
              _this.$refs.modalToast.is = false;
            }else{
              _this.$refs.modalToast.toast({
                txt:res.msg
              });
            }

          }).catch(function(error) {
            console.log(error)
          })

        }else{
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
        }
      }).catch(function(error) {
        console.log(error)
      })

    }
  },
  components: {
    modalToast
  },
  watch: {
    '$route' () {
      // 修改地址
      if(this.$route.query.address){
        this.address = JSON.parse(this.$route.query.address);
      }
      //console.log("地址：" + this.$route.query.goodsInfo);
    }
  }
}

</script>
<style scoped lang="scss" src="../../assets/styles/payOrder.scss"></style>
