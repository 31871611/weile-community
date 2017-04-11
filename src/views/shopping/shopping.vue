<template>

  <div class="wrap">

    <article class="main">
      <div class="mainScroll shopping">
        shopping
      </div>
    </article>
    <footer>
      <div class="footerCart">
        <div class="total">
          合计：<b>￥0.00</b><em>(已选0件)</em>
        </div>
        <div class="next">去结算</div>
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
