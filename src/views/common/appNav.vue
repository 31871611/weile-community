<template>

  <div class="appNav">
    <router-link to="/" class="home" :class="{select : selectClass == 'home'}">首页</router-link>
    <router-link to="community" class="community" :class="{select : selectClass == 'community'}">社区</router-link>
    <router-link to="store" class="convenient" :class="{select : selectClass == 'store'}">便利店</router-link>
    <router-link to="shopping" class="shopping" :class="{select : selectClass == 'shopping'}">
      购物车<b v-if="shoppingNum > 0">{{shoppingNum}}</b>
    </router-link>
    <router-link to="userHome" class="my" :class="{select : selectClass == 'userHome'}">我的</router-link>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import cart from '../../plugins/cart'

export default {
  //name: 'appNav',
  props:{
    selectClass:{
      type:String
    }
  },
  data() {
    return{
      shoppingNum:0
    }
  },
  mounted() {

      // 购物车数量
      this.getCartGoodsNum();

  },
  methods: {
    // 购物车数量
    getCartGoodsNum:function(){
      let _this = this;

      // 是否登录.获取购物车数量
      if(simplestorage.get('HLXK_STATUS')){
        // 获取购物车数量...每次加载本组件就
        this.$http.post('/community/getCartGoodsNum', {
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res)
          if (res.resultCode != 0) {
            alert(res.msg);
            return false;
          }
          _this.shoppingNum = res.data.cartGoodsNum;
        }).catch(function(error) {
          console.log(error)
        })
      }else{
        //获取缓存购物车商品信息
        _this.shoppingNum = cart.getAmount();
      }

      console.log('购物车数量：' + _this.shoppingNum)

    },
    // 跳转到外部url
    toLink:function(url){
      location.href = url;
    }
  },
  components: {

  }
}
</script>

