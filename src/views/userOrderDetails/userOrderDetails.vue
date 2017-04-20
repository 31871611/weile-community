<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll userOrderDetails">
        <div class="tel">
          <a href="">
            <span>便利店电话：0591-83336447</span>
            <i></i>
          </a>
        </div>

        <ul class="orderList">
          <li>
            <div class="top">
              <span class="time">订单时间：2016-09-08 12:00:00</span>
            </div>
            <div class="center">
              <div>
                <span>鸡肉</span>
                <span>1件</span>
                <strong>￥100.00</strong>
              </div>
              <div>
                <span>满200元减10元</span>
                <strong>-￥10.00</strong>
              </div>
            </div>
            <div class="bottom">
              <span class="total">合计</span>
              <span>1件</span>
              <strong>￥10.00</strong>
            </div>
          </li>
        </ul>

        <ul class="orderInfoList">
          <li>
            <span>收货人：</span>
            <span>张三</span>
          </li>
          <li>
            <span>电话：</span>
            <span>15341255221</span>
          </li>
          <li>
            <span>收货地址：</span>
            <span>橘园洲创意广场橘园洲创意广场橘园洲创意广场橘园洲创意广场橘园洲创意广场</span>
          </li>
          <li>
            <span>预计送达时间：</span>
            <span>2016-09-08 12:00-13:00</span>
          </li>
          <li>
            <span>支付方式：</span>
            <span>支付宝支付</span>
          </li>
          <li>
            <span>订单编号：</span>
            <span>10000000052</span>
          </li>
          <li>
            <span>申请退单原因：</span>
            <span>太慢</span>
          </li>
          <li>
            <span>备注：</span>
            <span>无</span>
          </li>
        </ul>

        <p class="hint">若长时间未收到退款，请联系微信客服。</p>
      </div>
    </article>

    <footer>
      <div class="userOrderDetailsPayBtn">
        <span>立即付款</span>
      </div>
      <div class="userOrderDetailsBtn">
        <span>取消订单</span>
        <span>立即付款</span>
      </div>
    </footer>
  </div>

</template>
<script>

export default {
  name: 'userOrderDetails',
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
<style scoped lang="scss" src="../../assets/styles/userOrderDetails.scss"></style>
