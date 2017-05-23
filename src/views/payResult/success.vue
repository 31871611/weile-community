<template>
  <div class="payResult">
    <i class="success"></i>
    <span class="txt">支付成功</span>
    <router-link class="buy" :to="{path:'/',query:{projectId:projectId}}">继续购买</router-link>
    <router-link class="orderDetails" :to="{path:'/userOrderDetails',query:{id:1,projectId:projectId}}">订单详情</router-link>
  </div>
</template>
<script>
import simplestorage from 'simplestorage.js'

export default {
  name: 'success',
  data() {
    return{
      projectId:simplestorage.get('projectId')
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
<style scoped lang="scss" src="../../assets/styles/payResult.scss"></style>
