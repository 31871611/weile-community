<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll userCoupon">
        <div class="hint"><span>您有{{failNum}}张优惠券即将过期</span></div>

        <ul class="userCouponList">
          <li v-for="list in lists">
            <a href="">
              <div class="left">
                <strong class="Price"><b>￥</b>{{list.faceValue / 1000}}</strong>
                <span class="txt">订单满{{list.orderMoney / 1000}}元</span>
                <span class="txt">(不含运费)可用</span>
              </div>
              <div class="right">
                <h3>指定商品使用{{list.couponType}}</h3>
                <em>{{list.effectiveTime}}-{{list.failureTime}}</em>
                <span class="overdue" v-if="list.failureType == 1">即将过期</span>
                <!--可用券-->
                <i class="steVoucher"></i>
                <!--箭头-->
                <i class="arrowR"></i>
              </div>
            </a>
            <div class="not">
              当前小区不可用
              点击切换
            </div>
          </li>



          <li class="disabled">
            <a href="">
              <div class="left">
                <strong class="Price"><b>￥</b>100</strong>
                <span class="txt">订单满100元</span>
                <span class="txt">(不含运费)可用</span>
              </div>
              <div class="right">
                <h3>指定商品使用</h3>
                <em>2016.01.01-2016.12.31</em>
                <span class="overdue">即将过期</span>
                <span class="set">立即领取</span>
                <!--可用券-->
                <i class="steVoucher"></i>
                <!--箭头-->
                <i class="arrowR"></i>
              </div>
            </a>
            <div class="not">
              <div>
                <p>当前小区不可用</p>
                <p>点击切换</p>
              </div>
            </div>
          </li>

          <li class="invalid">
            <a href="">
              <div class="left">
                <strong class="Price"><b>￥</b>100</strong>
                <span class="txt">订单满100元</span>
                <span class="txt">(不含运费)可用</span>
              </div>
              <div class="right">
                <h3>指定商品使用</h3>
                <em>2016.01.01-2016.12.31</em>
                <!--<span class="set">立即领取</span>-->
                <!--灰色券-->
                <i class="notVoucher"></i>
                <!--箭头-->
                <!--<i class="arrowR"></i>-->
                <!--已过期-->
                <i class="expired"></i>
                <!--已使用-->
                <!--<i class="alreadyUse"></i>-->
              </div>
            </a>
            <div class="not">
              当前小区不可用
              点击切换
            </div>
          </li>

          <li class="invalid">
            <a href="">
              <div class="left">
                <strong class="Price"><b>￥</b>100</strong>
                <!--<span class="txt">订单满100元</span>-->
                <!--<span class="txt">(不含运费)可用</span>-->
              </div>
              <div class="right">
                <h3>指定商品使用</h3>
                <em>2016.01.01-2016.12.31</em>
                <!--<span class="set">立即领取</span>-->
                <!--灰色券-->
                <i class="notVoucher"></i>
                <!--箭头-->
                <!--<i class="arrowR"></i>-->
                <!--已过期-->
                <!--<i class="expired"></i>-->
                <!--已使用-->
                <i class="alreadyUse"></i>
              </div>
            </a>
            <div class="not">
              当前小区不可用
              点击切换
            </div>
          </li>


        </ul>

        <div class="see">
          查看已失效的券
        </div>
      </div>

      <div class="notData" style="display: none">
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
  name: 'userCoupon',
  data() {
    return{
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
      'status':0        //0：未使用，1：已失效
    },{
      "encryptType":1
    }).then(function(res){
      console.log(res);
      if(res.resultCode != 0){
        alert(res.msg);
        return false;
      }
      _this.failNum = res.data.failNum;
      _this.lists = res.data.list;
      console.log(JSON.stringify(res.data));
      // 隐藏加载中
      _this.$refs.modalLoading.is = false;

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
