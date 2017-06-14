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
      <a href="javascript:;" class="buy" @click="toPay()">继续支付</a>
      <!--<router-link class="buy" :to="{path:'/userOrderDetails',query:{id:id,projectId:projectId}}">继续支付</router-link>-->
      <router-link class="orderDetails" :to="{path:'/store',query:{projectId:projectId}}">返回便利店</router-link>
    </template>

    <modal-toast ref="modalToast"></modal-toast>

  </div>
</template>
<script>
import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue'

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

    if(this.result == 'success'){
      this.setDocumentTitle('支付成功')
    }else if(this.result == 'error' || this.result == 'cancel'){
      this.setDocumentTitle('支付失败')
    }

  },
  methods: {
    // 立即支付
    toPay:function(){
      let _this = this;

      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });

      let url = location.protocol + '//' + location.host + '/#/success?projectId='+ _this.projectId +'&id=' + _this.$route.query.id;

      // 支付
      _this.$http.post('/community/collectionPay', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "orderId":_this.$route.query.id,
        "callbackUrl":url
      },{
        "encryptType":0
      }).then(function(res){
        //console.log(res);
        if(res.resultCode == 0){
          //alert(JSON.stringify(res.data));
          // 跳转去支付
          location.href = res.data.payUrl;
          // 隐藏加载中
          _this.$refs.modalToast.is = false;
        }else{
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
        }

      }).catch(function(error) {
        console.log(error)
      })

    },
    // 设置title
    setDocumentTitle:function(title){
      document.title = title;
      let ua = navigator.userAgent;
      if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        var i = document.createElement('iframe');
        //i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
          setTimeout(function () {
            i.remove();
          }, 9);
        };
        document.body.appendChild(i);
      }
    }
  },
  components: {
    modalToast
  }

}
</script>
<style scoped lang="scss" src="../../assets/styles/payResult.scss"></style>
