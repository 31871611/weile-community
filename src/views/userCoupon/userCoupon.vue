<template>
<div class="view fullPosition">


  <div class="wrap">
    <article class="main">
      <div class="mainScroll userCoupon" v-if="is">
        <div class="hint" v-if="failNum > 0"><span>您有{{failNum}}张优惠券即将过期</span></div>

        <ul class="userCouponList">
          <li v-for="list in lists" :class="{'disabled':!list.commutityType}">
            <router-link :to="{path:'userCoupon/details',query:{id:list.userCardId}}">
              <div class="left">
                <strong class="Price"><b>￥</b>{{list.faceValue / 1000}}</strong>
                <span class="txt">订单满{{list.orderMoney / 1000}}元</span>
                <span class="txt">(不含运费)可用</span>
              </div>
              <div class="right">
                <h3 v-if="list.couponType == 0">全店通用(团购商品除外)</h3>
                <h3 v-else-if="list.couponType == 1">指定商品适用</h3>
                <h3 v-else-if="list.couponType == 2">指定品类适用</h3>
                <h3 v-else-if="list.couponType == 3">指定商品适用</h3>
                <h3 v-else>{{list.couponType}}</h3>
                <em>{{list.effectiveTime}}-{{list.failureTime}}</em>
                <span class="overdue" v-if="list.failureType == 1">即将过期</span>
                <!--可用券-->
                <i class="steVoucher"></i>
                <!--箭头-->
                <i class="arrowR"></i>
              </div>
            </router-link>
            <div class="not">
              当前小区不可用
              点击切换
            </div>
          </li>

        </ul>

        <router-link to="userCoupon/invalid" class="see">
          查看已失效的券
        </router-link>
      </div>

      <not-data v-if="isNotData"></not-data>

      <modal-toast ref="modalToast"></modal-toast>
    </article>

  </div>

  <transition name="SlideRightLeft">
    <router-view></router-view>
  </transition>

</div>

</template>
<script>
/*

 // 我的优惠券
 "userCardId": "用户券编号",
 "couponId": "优惠券编号",
 我的优惠券与商品详情页的优惠券，进优惠券详情时使用不同id

 "couponType": "优惠券类型 0.全程通用 1.指定商品 2.商品分类 3.指定商品专题活动, 状态有4种, ui上提示根据策划规定的显示",
 0：全店通用(团购商品除外)
 1：指定商品适用
 2：指定品类适用
 3：

 commutityType
 识别是否是当前小区的优惠券，0不是  1是

*/
import simplestorage from 'simplestorage.js'
import notData from '../common/notData.vue'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'userCoupon',
  data() {
    return{
      is:false,
      isNotData:false,
      failNum:'',            // 即将过期数量
      lists:''               // 未使用优惠券
    }
  },
  mounted() {
    let _this = this;
    // 显示加载中
    _this.$refs.modalToast.toast({
      txt:'加载中',
      icon:'loading',
      time:0
    });
    // 获取数据列表
    this.$http.post('/community/getMyStoreCouponList', {
      "communityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      'status':0        //0：未使用，1：已失效
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
      _this.failNum = res.data.failNum;
      _this.lists = res.data.list;
      //console.log(JSON.stringify(res.data));
      // 隐藏加载中
      _this.$refs.modalToast.is = false;
      if(res.data.list.length > 0){
        // 显示列表数据
        _this.is = true;
      }else{
        // 显示没数据提示
        _this.isNotData = true;
      }


    }).catch(function(error) {
      console.log(error)
    })
  },
  methods: {

  },
  components: {
    modalToast,
    notData
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userCoupon.scss"></style>
