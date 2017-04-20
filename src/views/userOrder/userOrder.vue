<template>

  <div class="wrap">
    <header>
      <div class="userOrderTab">
        <a href="" class="select"><span>全部</span></a>
        <a href=""><span>待确认</span></a>
        <a href=""><span>待收货</span></a>
        <a href=""><span>已完成</span></a>
      </div>
    </header>
    <article class="main">
      <div class="mainScroll userOrder">
        <ul class="userOrderList">
          <li>
            <div class="top">
              <span class="time">订单时间：2016-09-08 12:00:00</span>
              <span class="state">待确认</span>
            </div>
            <div class="center">
              <div>
                <span>鸡肉x1</span>
                <strong>￥100.00</strong>
              </div>
              <div>
                <span>满200元减10元</span>
                <strong>-￥10.00</strong>
              </div>
            </div>
            <div class="bottom">
              <span class="total">共计1件</span>
              <strong><b>小计：</b>￥10.00</strong>
            </div>
          </li>
        </ul>
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
  name: 'userOrder',
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
<style scoped lang="scss" src="../../assets/styles/userOrder.scss"></style>
