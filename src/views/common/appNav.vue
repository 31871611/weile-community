<template>

  <div class="appNav">
    <router-link :to="{path:'/',query:{projectId:projectId}}" class="home" :class="{select : selectClass == 'home'}">首页</router-link>
    <router-link :to="{path:'store',query:{projectId:projectId}}" class="convenient" :class="{select : selectClass == 'store'}">好货</router-link>
    <!--<a href="javascript:;" class="community" @click="toLink()">社区</a>-->
    <router-link :to="{path:'community',query:{projectId:projectId}}" class="community" :class="{select : selectClass == 'community'}">社区</router-link>
    <router-link :to="{path:'shopping',query:{projectId:projectId}}" class="shopping" :class="{select : selectClass == 'shopping'}">
      购物车<b v-if="shoppingNum > 0" id="end">{{shoppingNum}}</b>
    </router-link>
    <router-link :to="{path:'userHome',query:{projectId:projectId}}" class="my" :class="{select : selectClass == 'userHome'}">我的</router-link>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
//import Bus from '../../plugins/bus'
import cart from '../../plugins/cart'
import {opModal} from '../../plugins/common'

export default {
  //name: 'appNav',
  props:{
    selectClass:{
      type:String
    }
  },
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      shoppingNum:0
    }
  },
  created: function() {

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
      if(simplestorage.get('HLXK_UserId') != -1){
        // 获取购物车数量...每次加载本组件就
        this.$http.post('/community/getCartGoodsNum', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res)
          if (res.resultCode == 0) {
            _this.shoppingNum = res.data.cartGoodsNum;
          }else if(res.resultCode == 1000){

          }else{
            opModal.toast({
              txt:res.msg
            })
          }

        }).catch(function(error) {
          console.log(error)
          opModal.toast({
            txt:'连接超时！'
          })
          return false;
        })
      }else{
        //获取缓存购物车商品信息
        _this.shoppingNum = cart.getAmount();
      }

      //console.log('购物车数量：' + _this.shoppingNum)

    },
    // 跳转到外部url
    toLink:function(){

      //location.href = propertyAuth + '/api/pub/estate/auth?communityId='+ simplestorage.get('HLXK_DISTRIBUTION').id +'&redirect_uri=' + encodeURIComponent(location.href);
    }

  },
  components: {

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_appNav.scss"></style>
