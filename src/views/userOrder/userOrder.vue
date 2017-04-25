<template>

  <div class="wrap">
    <header>
      <div class="userOrderTab">
        <router-link :to="{path:'',query:{status:0}}" :class="{'select':$route.query.status == 0}"><span>全部</span></router-link>
        <a href=""><span>待确认</span></a>
        <a href=""><span>待收货</span></a>
        <a href=""><span>已完成</span></a>
      </div>
    </header>
    <article class="main">
      <div class="mainScroll userOrder">
        <ul class="userOrderList">
          <li v-for="list in lists">
            <router-link :to="{path:'userOrderDetails',query:{id:list.orderId}}">
              <div class="top">
                <span class="time">订单时间：{{list.createTimeStr}}</span>
                <span class="state">待确认</span>
              </div>
              <div class="center">
                <div v-for="goods in list.goodsList">
                  <span>{{goods.goodsName}} x{{goods.amount}}</span>
                  <strong>￥{{goods.price}}</strong>
                </div>
              </div>
              <div class="bottom">
                <span class="total">共计{{list.goodsTotalNum}}件</span>
                <strong><b>小计：</b>￥{{list.payAmount}}</strong>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <modal-toast ref="modalLoading" :txt="'加载中'" :icon="'loading'" :time="0"></modal-toast>
    </article>

  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'userOrder',
  data() {
    return{
      lists:''
    }
  },
  mounted() {
    let _this = this;
    // 显示加载中
    _this.$refs.modalLoading.is = true;
    _this.init();

  },
  methods: {
    init:function(){
      let _this = this;
      this.$http.post('/community/getMyStoreOrder',{
        "status":this.$route.query.status || 0,
        "pageSize":10,
        "pageIndex":1,
        "isGroupBuyingOrder":0,
        "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":1
      }).then(function(res) {
        console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.lists = res.data;
        // 隐藏加载中
        _this.$refs.modalLoading.is = false;
        console.log(JSON.stringify(_this.lists));
      }).catch(function(error) {
        console.log(error)
      })
    }
  },
  components: {
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userOrder.scss"></style>
