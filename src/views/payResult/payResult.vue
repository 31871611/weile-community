<template>
  <div class="payResult">
    <i class="success"></i>
    <span class="txt">支付成功</span>
    <div class="buy">继续购买</div>
    <div class="orderDetails">订单详情</div>

    <i class="error"></i>
    <span class="txt">支付失败</span>
    <div class="buy">继续支付</div>
    <div class="orderDetails">返回便利店</div>
  </div>
</template>
<script>

export default {
  name: 'payResult',
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
<style scoped lang="scss" src="../../assets/styles/payResult.scss"></style>
