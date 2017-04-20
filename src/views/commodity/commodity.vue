<template>
  <div class="wrap">
    <article class="main">
      <div class="mainScroll commodity">

        <div class="commodityPhoto">
          <img :src="list.urls" alt="">
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
          <h1>{{list.name}}</h1>
          <div class="info">
            <div class="left">
              <div class="priceNum">
                <span class="price"><b>￥</b>{{list.priceYuan}}</span>
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
        <div class="commoditySetCoupon">
          <b>优惠券</b>
          <span>20元优惠券 30元优惠券 50元优惠券</span>
          <i></i>
        </div>

        <div class="commodityContent">
          <h2>图文详情</h2>
          <div class="txt" v-for="txt in list.images">
            <img :src="txt.img" alt="">
            <div class="video" v-if="txt.video">
              <video :src="txt.video" controls="controls">
                您的浏览器不支持 video 标签。
              </video>
            </div>
            <p>{{txt.info}}</p>
          </div>
        </div>

        <!-- 领取优惠券弹窗 -->
        <div class="commoditySetCouponAlert">
          <ul>
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

          <div class="btn">
            关闭
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
import simplestorage from 'simplestorage.js'

export default {
  name: 'commodity',
  data() {
    return {
      list:''
    }
  },
  mounted() {
    let _this = this;

    this.$http.post('/community/getCommodityDetail', {
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      "commodityId": this.$route.query.id
    },{
      "encryptType":1
    }).then(function(res) {
      console.log(res.data);
      if (res.resultCode != 0) {
        return false;
      }
      _this.list = res.data
      console.log(JSON.stringify(res.data));

    }).catch(function(error) {
      console.log(error)
    })
  },
  methods: {

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/commodity.scss"></style>
