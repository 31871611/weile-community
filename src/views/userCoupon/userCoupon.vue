<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll userCoupon">
        <div class="hint"><span>您有3张优惠券即将过期</span></div>

        <ul class="userCouponList">
          <li>
            <div class="left">
              <strong class="Price"><b>￥</b>100</strong>
              <span class="txt">订单满100元</span>
              <span class="txt">(不含运费)可用</span>
            </div>
            <div class="right">
              <h3>指定商品使用</h3>
              <em>2016.01.01-2016.12.31</em>
              <span class="overdue">即将过期</span>
              <!--可用券-->
              <i class="steVoucher"></i>
              <!--箭头-->
              <i class="arrowR"></i>
            </div>
            <div class="not">
              当前小区不可用
              点击切换
            </div>
          </li>
          <li>
            <div class="left">
              <strong class="Price"><b>￥</b>100</strong>
              <span class="txt">订单满100元</span>
              <span class="txt">(不含运费)可用</span>
            </div>
            <div class="right">
              <h3>指定商品使用</h3>
              <em>2016.01.01-2016.12.31</em>
              <span class="set">立即领取</span>
              <!--可用券-->
              <i class="steVoucher"></i>
              <!--箭头-->
              <i class="arrowR"></i>
            </div>
            <div class="not">
              当前小区不可用
              点击切换
            </div>
          </li>


          <li class="disabled">
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
            <div class="not">
              <div>
                <p>当前小区不可用</p>
                <p>点击切换</p>
              </div>
            </div>
          </li>

          <li class="invalid">
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
            <div class="not">
              当前小区不可用
              点击切换
            </div>
          </li>

          <li class="invalid">
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
    </article>

  </div>

</template>
<script>

export default {
  name: 'userCoupon',
  data() {
    return{

    }
  },
  mounted() {

  },
  methods: {

  },
  components: {

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userCoupon.scss"></style>
