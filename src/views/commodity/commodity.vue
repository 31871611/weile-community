<template>
  <div class="wrap">
    <article class="main">
      <div class="mainScroll commodity">
        <div class="commodityPhoto">
          <img src="" alt="">
        </div>


        <div class="">
          <h1>标题</h1>
          <div>
            <span class="price">￥21.00</span>
            <span class="originalCost">￥26.00</span>
          </div>

          限购5件
          加1减
        </div>

        <ul class="type">
          <li>销量：1554件</li>
          <li>规格：500ml</li>
        </ul>

        <div>此商品参与</div>

        <div>图文详情</div>
        <div>
          图片
          文字
        </div>
      </div>
    </article>
    <footer>
      <div class="commodityFooter">
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
