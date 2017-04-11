<template>

  <div class="wrap">

    <article class="main">
      <div class="mainScroll shopping">
        shopping
      </div>
    </article>
    <footer>
      <div class="footerInfo">
        差1.00元免配送费
      </div>
      <div class="footerCart">
        <div class="box">
          <input id="all" type="radio" />
          <label for="all">全选</label>
          <div class="total">
            <span>合计：<b>￥200.00</b></span>
            <em>已优惠￥50</em>
          </div>
        </div>
        <div class="next del">去结算</div>
      </div>
      <div class="appNav">
        <router-link to="home" class="home">首页</router-link>
        <router-link to="a" class="community">社区</router-link>
        <router-link to="store" class="convenient">便利店</router-link>
        <router-link to="shopping" class="shopping">购物车</router-link>
        <router-link to="d" class="my">我的</router-link>
      </div>
    </footer>
  </div>

</template>
<script>

export default {
  name: 'shopping'
}
</script>
<style scoped lang="scss" src="../../assets/styles/shopping.scss"></style>
