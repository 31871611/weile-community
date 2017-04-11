<template>

  <div class="wrap">

    <article class="main">
      <div class="mainScroll payOrder">
        <div class="payOrderTitle">
          配送地址
        </div>
        <div class="payOrderAddress">
          <div class="box">
            <span class="name">收货人：张小姐</span>
            <span class="tel">1370888888</span>
            <p>收货人收货人收货人收货人收货人收货人收货人收货人收货人</p>
          </div>
          <i class="arrowR"></i>
        </div>

        <div class="payOrderTime">
          <span class="fl">送达时间</span>
          <span class="fr">尽快送达</span>
        </div>
        <div class="payOrderTextarea" contenteditable="true">
          点击添加留言
        </div>

        <div class="payOrderTitle">
          采购清单
        </div>
        <div class="goodsList">
          <ul>
            <li v-for="list in 2">
              <a href="" class="photo">
                <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
              </a>
              <div class="box">
                <h3>标题标题标题标题标题标题</h3>
                <div class="bottom">
                  <strong class="price">￥200</strong>
                  <span class="num">x1</span>
                </div>
              </div>
            </li>
          </ul>
        </div>


        <ul class="payOrderInfo">
          <li>
            <i class="give"></i>
            <span>胡椒粉一瓶</span>
            <strong>￥0.00</strong>
          </li>
          <li>
            <span>胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶胡椒粉一瓶</span>
            <strong>￥0.00</strong>
          </li>
          <li>
            <span class="prompt">共计2件商品</span>
            <strong>合计：<b>￥0.00</b></strong>
          </li>
        </ul>


        <div class="payOrderSelectAddress">
          <div class="payOrderTitle">
            可配送地址
          </div>
          <ul>
            <li>
              <div><span class="name">姓名</span><span class="tel">130000000000</span></div>
              <p>地址地址地址地址地址地址地址地址地址地址地址地址地址地址</p>
              <i></i>
            </li>
            <li>
              <div><span class="name">姓名</span><span class="tel">130000000000</span></div>
              <p>地址地址地址地址地址地址地址地址地址地址地址地址地址地址</p>
              <i></i>
            </li>
          </ul>
          <div class="payOrderTitle">
            不可配送地址
          </div>
          <ul>
            <li class="select">
              <div><span class="name">姓名</span><span class="tel">130000000000</span></div>
              <p>地址地址地址地址地址地址地址地址地址地址地址地址地址地址</p>
              <i></i>
            </li>
          </ul>
        </div>


      </div>
    </article>
    <footer>
      <div class="payOrderAddAddress">
        <div>提交</div>
      </div>
      <div class="footerCart">
        <div class="total">
          还需支付：<b>￥0.00</b>
        </div>
        <div class="next">立即下单</div>
      </div>
    </footer>
  </div>

</template>
<script>

export default {
  name: 'payOrder'
}
</script>
<style scoped lang="scss" src="../../assets/styles/payOrder.scss"></style>
