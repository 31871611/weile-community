<template>
  <div class="wrap">
    <article class="main">
      <div class="mainScroll commodity">
        <div class="commodityPhoto">
          <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
        </div>

        <!-- 抢购倒记时-未开始 -->
        <div class="commodityRushTime">
          <div class="priceNum">
            <span class="price"><b>￥</b>21.00</span>
            <div>
              <span class="originalCost">￥26.00</span>
              <span class="limit">限购5件</span>
            </div>
          </div>

          <div class="time">
            <p>距开抢 5天10:00:00</p>
            <div class="start">11月1日17:00开抢</div>
            <i></i>
          </div>
        </div>

        <!--抢购进行中-->
        <div class="commodityRushGo">

          <div class="priceNum">
            <i class="iconClock"></i>
            <div class="endTime">
              <span>距结束</span>
              <span>5天10:00:00</span>
            </div>
          </div>

          <div class="time">
            <p>剩余58件</p>
            <div class="start">已抢98%</div>
            <i></i>
          </div>
        </div>

        <div class="commodityRushEnd">
          <h3>特价库存已被抢光...</h3>
          <p>部分用户未付款，还有机会哦</p>
        </div>

        <div class="commodityTitle">
          <h1>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h1>
          <div class="info">
            <div class="left">
              <div class="priceNum">
                <span class="price"><b>￥</b>21.00</span>
                <span class="repertory">(库存300件)</span>
              </div>
              <span class="originalCost">￥26.00</span>
            </div>
            <div class="right">
              <span class="limit">限购5件</span>
              <div class="selectNum">
                <div class="reduce"></div>
                <input type="text" value="1" />
                <div class="add"></div>
              </div>
            </div>
          </div>
        </div>

        <ul class="commodityType">
          <li>销量：1554件</li>
          <li>规格：500ml</li>
        </ul>

        <div class="commodityCue">此商品参与</div>

        <div class="commodityContent">
          <h2>图文详情</h2>
          <div class="txt">
            <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
            <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
          </div>
        </div>

      </div>
    </article>
    <footer>
      <div class="commodityFooterNormal">
        <div class="shopping">
          <div><b>1</b></div>
          <span>购物车</span>
        </div>
        <div class="add">
          加入购物车
        </div>
        <div class="pay">
          立即购买
        </div>
      </div>
      <div class="commodityFooterNot">
        <div class="not">已售罄</div>
      </div>
      <div class="commodityFooterBuy">
        <div class="buy">立即购买</div>
      </div>
      <div class="commodityFooterCart">
        <div class="shopping">
          <div><b>1</b></div>
        </div>
        <div class="price">￥21.00</div>
        <div class="add">加入购物车</div>
      </div>

    </footer>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'commodity',
  data() {
    return {
    }
  },
  mounted() {
//    this.$http.post('/community/homePage', {
//        distributionCommunityId: 10
//      }).then(function(res) {
//        let data = res.data || {}
//        if (res.resultCode == 0) {
//
//        }
//      }).catch(function(error) {
//        console.log(error)
//      })
  },
  methods: {

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/commodity.scss"></style>
