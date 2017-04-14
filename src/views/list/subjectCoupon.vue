<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll subjectCoupon">
        <div class="adPhoto">
          <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
        </div>

        <ul class="subjectCouponList">
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
              <span class="set select">已被抢光</span>
              <!--可用券-->
              <i class="steVoucher"></i>
              <!--箭头-->
              <i class="arrowR"></i>
            </div>
          </li>
        </ul>

      </div>

    </article>
  </div>

</template>
<script>

export default {
  name: 'subjectCoupon'
}
</script>
<style scoped lang="scss" src="../../assets/styles/subjectCoupon.scss"></style>
