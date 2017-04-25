<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll userCoupon" v-if="is">

        <ul class="userCouponList">
          <li class="invalid" v-for="list in lists">
            <a href="javascript:;">
              <div class="left">
                <strong class="Price"><b>￥</b>{{list.faceValue / 1000}}</strong>
                <span class="txt">订单满{{list.orderMoney / 1000}}元</span>
                <span class="txt">(不含运费)可用</span>
              </div>
              <div class="right">
                <h3 v-if="list.couponType == 0">全店通用(团购商品除外)</h3>
                <h3 v-else-if="list.couponType == 1">指定商品适用</h3>
                <h3 v-else-if="list.couponType == 2">指定品类适用</h3>
                <h3 v-else-if="list.couponType == 3">{{list.couponType}}</h3>
                <em>{{list.effectiveTime}}-{{list.failureTime}}</em>
                <span class="overdue" v-if="list.failureType == 1">即将过期</span>
                <!--可用券-->
                <i class="notVoucher"></i>
                <!--已使用-->
                <i class="alreadyUse" v-if="list.status == 1"></i>
                <!--已过期-->
                <i class="expired" v-else-if="list.status == 2"></i>
              </div>
            </a>
            <div class="not">
              当前小区不可用
              点击切换
            </div>
          </li>

        </ul>

      </div>

      <div class="notData" v-if="isNotData">
        <div class="box">
          <i></i>
          <span>当前没有数据哦~</span>
        </div>
      </div>

      <modal-toast ref="modalLoading" :txt="'加载中'" :icon="'loading'" :time="0"></modal-toast>
    </article>

  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'invalidCoupon',
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
    _this.$refs.modalLoading.is = true;
    // 获取数据列表
    this.$http.post('/community/getMyStoreCouponList', {
      "communityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      'status':1        //0：未使用，1：已失效
    },{
      "encryptType":1
    }).then(function(res){
      //console.log(res);
      if(res.resultCode != 0){
        alert(res.msg);
        return false;
      }
      _this.failNum = res.data.failNum;
      _this.lists = res.data.list;
      //console.log(JSON.stringify(res.data));
      // 隐藏加载中
      _this.$refs.modalLoading.is = false;
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
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userCoupon.scss"></style>
