<template>
<div class="view fullPosition">

  <div class="wrap">
    <article class="main">
      <div class="mainScroll userOrderDetails">
        <div class="tel">
          <a :href="'tel:'+list.telephone">
            <span>便利店电话：{{list.telephone}}</span>
            <i></i>
          </a>
        </div>

        <ul class="orderList">
          <li>
            <div class="top">
              <span class="time">订单时间：{{list.createTimeStr}}</span>
              <span class="state" v-if="list.payStatus == 0 && list.status == 1">等待付款</span>
              <span class="state" v-else>{{list.statusStr}}</span>
            </div>
            <div class="center">
              <section v-for="goods in list.goodsList">
                <img :src="goods.imageUrl" alt="">
                <div>
                  <h3>{{goods.goodsName}}</h3>
                  <strong>￥{{goods.price / 1000 | price}}</strong>
                </div>
                <span>x{{goods.amount}}</span>
              </section>
              <!-- 赠品信息 -->
              <section v-for="gifts in list.giftsList">
                <h3>{{gift.giftName}}x{{gift.giftNum}}</h3>
                <strong>¥0.00</strong>
              </section>
              <!-- 优惠券活动列表 -->
              <section v-for="activity in list.activityList">
                <h3>{{activity.activityName}}：{{activity.discountStr}}</h3>
                <strong>-¥{{activity.discountMoney / 1000 | price}}</strong>
              </section>
              <section v-if="list.distributionAmount">
                <h3>配送费</h3>
                <strong>￥{{list.distributionAmount / 1000 | price}}</strong>
              </section>
              <section v-if="list.discountSnapshotId">
                <h3>{{list.couponAmount / 1000}}元优惠券</h3>
                <strong>-￥{{list.couponAmount / 1000 | price}}</strong>
              </section>
            </div>
            <div class="bottom">
              <span class="total">共计{{list.goodsTotalNum}}件商品</span>
              <strong>小计：￥{{list.payAmount / 1000 | price}}</strong>
            </div>
          </li>
        </ul>

        <ul class="orderInfoList">
          <li>
            <span>收货人：</span>
            <span>{{list.consignee}}</span>
          </li>
          <li>
            <span>电话：</span>
            <span>{{list.mobile}}</span>
          </li>
          <li>
            <span>收货地址：</span>
            <span>{{list.address}}</span>
          </li>
          <li>
            <span>预计送达时间：</span>
            <span v-if="list.expectedTimeType == 2">{{list.expectedTime}}</span>
            <span v-else>{{list.expectedTimeTypeStr}}</span>
          </li>
          <li>
            <span>支付方式：</span>
            <span>{{list.payMethodStr}}</span>
          </li>
          <li>
            <span>订单编号：</span>
            <span>{{list.orderNo}}</span>
          </li>
          <li v-if="list.rejectReason">
            <span>拒绝原因：</span>
            <span>{{list.rejectReason}}</span>
          </li>
          <li v-if="list.cancelReason">
            <span>申请退单原因：</span>
            <span>{{list.cancelReason}}</span>
          </li>
          <li>
            <span>备注：</span>
            <span v-if="list.comments">{{list.comments}}</span>
            <span v-else>无</span>
          </li>
        </ul>

        <p class="hint" v-if="list.status == 4 || list.status == 5">若长时间未收到退款，请联系微信客服。</p>
      </div>

      <modal-toast ref="modalToast"></modal-toast>

    </article>

    <footer>
      <div class="userOrderDetailsBtn" v-if="list.payStatus == 0 && list.status == 1">
        <span @click="cancelOrder(list.orderId,'已支付金额将在3-10个工作日退回原账户，您是否需要取消订单?')">取消订单</span>
        <span @click="toPay">立即付款</span>
      </div>
      <div class="userOrderDetailsPayBtn" v-if="list.payStatus == 2 && list.status == 1">
        <span @click="cancelOrder(list.orderId,'已支付金额将在3-10个工作日退回原账户，您是否需要取消订单?')">取消订单</span>
      </div>
      <div class="userOrderDetailsPayBtn" v-if="list.payStatus == 2 && list.status == 2">
        <router-link :to="{path:'userApplyBack',query:{id:list.orderId}}">申请退单</router-link>
      </div>
      <div class="userOrderDetailsPayBtn" v-if="list.status == 6">
        <span @click="cancelReturn(list.orderId,'您是否需要取消退单?')">取消退单</span>
      </div>
    </footer>
  </div>

  <transition name="SlideRightLeft">
    <router-view :list="list"></router-view>
  </transition>

</div>
</template>
<script>
/*

 "distributionAmount": 3000,          //配送费

 "expectedTimeTypeStr": "尽快送达",
 "expectedTimeType": 1,               //送货时间类型：1-尽快送达 2-具体时间段

 "createTime": 1489048660000,         //创建时间
 "createTimeStr": "2017/03/15 20:20:35",

 "statusStr": "待发货",                //订单状态字符串
 "status": 1,                         //订单状态：1.等待确认,2.送货中,3.订单完成,4.商户取消订单,5.用户取消订单,6.用户退单申请

 --------------------------------------------------------------------------

 "activityList": [],                  //优惠活动列表串
 "couponAmount": 22000,               //优惠券金额.有
 "discountSnapshotId": "",            //优惠信息id
 "userCardPackageId": 12,             //卡包id

------------------------------------------------------------------------

  // 如果有支付就会显示2.已付款
 "payStatus": 0,                      //付款状态：0表示未付款，1表示付款中（请求了第三方接口，但未回调），2表示已付款
 "payStatusStr": "未付款",            //付款状态字符串

 "refundStatus": 0,                   //退款状态：0表示无需退款，1表示待退款，2表示退款中 3-已退款
 "refundStatusStr": "无需退款",        //退款状态字符串

 "orderId": 10000110,                 //订单id.支付需要
 "isGroupBuyingOrder": false,         //是否团购订单



*/
import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue'
import {opModal} from '../../plugins/common'

export default {
  name: 'userOrderDetails',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      list:''
    }
  },
  mounted() {
    let _this = this;
    _this.init();

  },
  beforeRouteUpdate (to, from, next) {
    //console.log(to.name);
    if(to.name == 'userOrderDetails'){
      this.init();
    }
    next();
  },
  methods: {
    init:function(){
      let _this = this;
      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });
      this.$http.post('/community/getStoreOrderDetail',{
        "orderId":this.$route.query.id,
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":1
      }).then(function(res) {
        //console.log(res);
        if(res.resultCode != 0){
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
          return false;
        }
        _this.list = res.data;
        // 隐藏加载中
        _this.$refs.modalToast.is = false;
        //console.log(JSON.stringify(_this.list));
      }).catch(function(error) {
        console.log(error)
        opModal.toast({
          txt:'连接超时！'
        })
        return false;
      })
    },
    // 取消订单
    cancelOrder:function(id,txt){
      let _this = this;
      // 提示是否取消
      opModal.alert({
        content:txt,
        ok:"确定",
        onOk:function(){
          // 显示加载中
          _this.$refs.modalToast.toast({
            txt:'加载中',
            icon:'loading',
            time:0
          });
          _this.$http.post('/community/cancelStoreOrder',{
            "orderId":id,
            "projectId":simplestorage.get('projectId'),
            "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
          },{
            "encryptType":1
          }).then(function(res) {
            //console.log(res);
            if(res.resultCode != 0){
              _this.$refs.modalToast.toast({
                txt:res.msg
              });
              return false;
            }
            // 隐藏加载中
            _this.$refs.modalToast.is = false;
            // 返回我的订单 || 我的团购
            if(_this.list.isGroupBuyingOrder){
              _this.$router.push({ path: 'userOrder', query: { group: 1 }})
            }else{
              _this.$router.push('userOrder');
            }
          }).catch(function(error) {
            console.log(error)
            opModal.toast({
              txt:'连接超时！'
            })
            return false;
          })

        },
        cancel:'取消',
        onCancel:function(){

        }
      })
      return false;
    },
    // 取消退单
    cancelReturn:function(id,txt){
      let _this = this;
      // 提示是否取消
      opModal.alert({
        content:txt,
        ok:"确定",
        onOk:function(){

          // 显示加载中
          _this.$refs.modalToast.toast({
            txt:'加载中',
            icon:'loading',
            time:0
          });
          _this.$http.post('/community/cancelApplication',{
            "orderId":id,
            "projectId":simplestorage.get('projectId'),
            "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
          },{
            "encryptType":1
          }).then(function(res) {
            console.log(res);
            if(res.resultCode != 0){
              _this.$refs.modalToast.toast({
                txt:res.msg
              });
              return false;
            }
            // 隐藏加载中
            _this.$refs.modalToast.is = false;
            // 返回我的订单 || 我的团购
            if(_this.list.isGroupBuyingOrder){
              _this.$router.push({ path: 'userOrder', query: { group: 1 }})
            }else{
              _this.$router.push('userOrder');
            }
          }).catch(function(error) {
            console.log(error)
            opModal.toast({
              txt:'连接超时！'
            })
            return false;
          })

        },
        cancel:'取消',
        onCancel:function(){

        }
      })
      return false;
    },
    // 立即支付
    toPay:function(){
      let _this = this;

      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });

      let url = location.protocol + '//' + location.host + '/#/success?projectId='+ _this.projectId +'&id=' + _this.$route.query.id;

      // 支付
      _this.$http.post('/community/collectionPay', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "orderId":_this.$route.query.id,
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
        opModal.toast({
          txt:'连接超时！'
        })
        return false;
      })

    }
  },
  components: {
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userOrderDetails.scss"></style>
