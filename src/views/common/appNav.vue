<template>

  <div class="appNav">
    <router-link to="/" class="home" :class="{select : selectClass == 'home'}">首页</router-link>
    <router-link to="community" class="community" :class="{select : selectClass == 'community'}">社区</router-link>
    <router-link to="store" class="convenient" :class="{select : selectClass == 'store'}">便利店</router-link>
    <router-link to="shopping" class="shopping" :class="{select : selectClass == 'shopping'}">购物车</router-link>
    <router-link to="userHome" class="my" :class="{select : selectClass == 'userHome'}">我的</router-link>
  </div>

</template>
<script>

export default {
  name: 'appNav',
  props:['selectClass']
}
</script>

