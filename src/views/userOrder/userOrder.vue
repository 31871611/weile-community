<template>

  <div class="wrap">
    <header>
      <div class="userOrderTab">
        <!-- 0全部,1.等待确认,2.待收货,3.订单完成,4.商户取消订单,5.用户取消订单,6.用户退单申请,-1表示4+5 -->
        <a href="javascript:;" :class="{'select':status == 0}" @click="init(0)"><span>全部</span></a>
        <a href="javascript:;" :class="{'select':status == 1}" @click="init(1)"><span>待确认</span></a>
        <a href="javascript:;" :class="{'select':status == 2}" @click="init(2)"><span>待收货</span></a>
        <a href="javascript:;" :class="{'select':status == 3}" @click="init(3)"><span>已完成</span></a>
        <a href="javascript:;" :class="{'select':status == 4}" @click="init(4)"><span>商户取消</span></a>
        <a href="javascript:;" :class="{'select':status == 5}" @click="init(5)"><span>已取消</span></a>
        <a href="javascript:;" :class="{'select':status == 6}" @click="init(6)"><span>退单中</span></a>
      </div>
    </header>
    <article class="main">
      <div class="mainScroll userOrder">
        <ul class="userOrderList">
          <li v-for="list in lists">
            <router-link :to="{path:'userOrderDetails',query:{id:list.orderId}}">
              <div class="top">
                <span class="time">订单时间：{{list.createTimeStr}}</span>
                <span class="state" v-if="list.payStatus == 0 && list.status == 1">等待付款</span>
                <span class="state" v-else>{{list.statusStr}}</span>
                <!--
                等待付款
                1.等待确认,2.送货中,3.订单完成,4.商户取消订单,5.用户取消订单,6.用户退单申请
                <span class="state" v-if="list.payStatus == 0 && list.status == 1">等待付款</span>
                <span class="state" v-if="list.payStatus != 0 && list.status == 1">待发货</span>
                <span class="state" v-else-if="list.status == 2">送货中</span>
                <span class="state" v-else-if="list.status == 3">订单完成</span>
                <span class="state" v-else-if="list.status == 4">商户取消订单</span>
                <span class="state" v-else-if="list.status == 5">用户取消订单</span>
                <span class="state" v-else-if="list.status == 6">退单已申请</span>
                <span class="state" v-else-if="list.status == -1">取消订单</span>
                <span class="state" v-else-if="list.status == 11">退款中</span>
                -->
              </div>
              <div class="center">
                <section v-for="goods in list.goodsList">
                  <h3>{{goods.goodsName}} x{{goods.amount}}</h3>
                  <strong>￥{{goods.price / 1000 | price}}</strong>
                </section>
                <section v-if="list.discountSnapshotId">
                  <h3>{{list.couponAmount / 1000}}元优惠券</h3>
                  <strong>-￥{{list.couponAmount / 1000 | price}}</strong>
                </section>
                <section v-if="list.distributionAmount">
                  <h3>配送费</h3>
                  <strong>￥{{list.distributionAmount / 1000 | price}}</strong>
                </section>
              </div>
              <div class="bottom">
                <span class="total">共计{{list.goodsTotalNum}}件</span>
                <strong><b>小计：</b>￥{{list.payAmount / 1000 | price}}</strong>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <modal-toast ref="modalLoading" :txt="'加载中'" :icon="'loading'" :time="0"></modal-toast>
    </article>

  </div>

</template>
<script>
/*

"status": 1,                    //订单状态：1.等待确认,2.送货中,3.订单完成,4.商户取消订单,5.用户取消订单,6.用户退单申请
"statusStr": "用户取消订单",

"createTime": 1489048660000,    //创建时间
"createTimeStr": "2017/03/15 20:20:35",

 "distributionAmount": 3000,     //配送费.有
-------------------------------------------------------------------------------------------

"couponAmount": 22000,          //优惠券金额.有
"userCardPackageId": 12,        //卡包id.有couponAmount时有数据
"discountSnapshotId": null,     //优惠信息id

"refundStatus": null,           //退款状态：0表示无需退款，1表示待退款，2表示退款中 3-已退款
"refundStatusStr": "无需退款",   //退款状态字符串

0未付款，显示等待付款
"payStatus": 0,                 //付款状态：0表示未付款，1表示付款中（请求了第三方接口，但未回调），2表示已付款
"payStatusStr": "未付款",        //付款状态字符串


-------------------------------------------------------------------------------------------------

*/

import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'userOrder',
  data() {
    return{
      lists:'',
      status:0
    }
  },
  mounted() {
    let _this = this;
    _this.init(0);

  },
  methods: {
    init:function(status){
      let _this = this;
      _this.status = status;
      // 显示加载中
      _this.$refs.modalLoading.is = true;
      this.$http.post('/community/getMyStoreOrder',{
        "status":status,    //订单状态：0全部,1.待发货,2.送货中,3.订单完成,4.商户取消订单,5.用户取消订单,6.用户退单申请,-1表示4+5
        "pageSize":10,
        "pageIndex":1,
        "isGroupBuyingOrder":this.$route.query.group || 0,     //0表示普通订单，1表示团购订单
        "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":1
      }).then(function(res) {
        //console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.lists = res.data;
        // 隐藏加载中
        _this.$refs.modalLoading.is = false;
        //console.log(JSON.stringify(_this.lists));
      }).catch(function(error) {
        console.log(error)
      })
    }
  },
  components: {
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userOrder.scss"></style>
