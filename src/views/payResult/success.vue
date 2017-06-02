<template>
  <div class="payResult">

    <template v-if="result == 'success'">
      <i class="success"></i>
      <span class="txt">支付成功</span>
      <router-link class="buy" :to="{path:'/',query:{projectId:projectId}}">继续购买</router-link>
      <router-link class="orderDetails" :to="{path:'/userOrderDetails',query:{id:id,projectId:projectId}}">订单详情</router-link>
    </template>
    <template v-if="result == 'cancel' || result == 'error'">
      <i class="error"></i>
      <span class="txt">支付失败</span>
      <router-link class="buy" :to="{path:'/userOrderDetails',query:{id:id,projectId:projectId}}">继续支付</router-link>
      <router-link class="orderDetails" :to="{path:'/store',query:{projectId:projectId}}">返回便利店</router-link>
    </template>

  </div>
</template>
<script>
import simplestorage from 'simplestorage.js'

export default {
  name: 'success',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      id:this.$route.query.id,
      result:this.$route.query.result
    }
  },
  mounted() {
    /**
     * 成功、失败、取消
     * result=success
     * result=cancel
     * result=error
     */
  },
  methods: {

  },
  components: {

  }

}
</script>
<style scoped lang="scss" src="../../assets/styles/payResult.scss"></style>
