<template>

  <div v-if="type" class="num" @click="add()"></div>
  <div v-else class="selectNum">
    {{nowShopCarCount}}
    <div class="remove" @click="remove()"></div>
    <input type="text" value="1" v-model="shopCarCount" />
    <div class="add" @click="add()"></div>
  </div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import cart from '../../plugins/cart'

export default {
  props:{
    list:{
      type:String
    },
    type:{
      type:Boolean,
      default: true
    },
    index:{
      type:Number
    },
    parentIndex:{
      type:Number
    },
    commodityId:{
      type:Number
    },
    shopCarCount:{
      type:Number
    },
    inventory:{
      type:Number
    }
  },
  data() {
    return{
      is:true,
      nowShopCarCount:0
    }
  },
  mounted() {

  },
  methods: {
    // 添加购物车
    add:function(){
      let _this = this;
      let isLogin = simplestorage.get('HLXK_STATUS');
      /*

       jsp只用到3个值：商品id、商品库存、小区id
       详情页进入的时候没有库存的按钮变为灰色.不添加到购物车？在加入购物车按钮加入购物车...
       结算成功需要把购物车中信息删除？

       */

      // 本商品库存
      let shopCarCount = 0;
      // 是否登录
      if (isLogin) {
        // 读取接口本商品库存
        _this.nowShopCarCount = _this.shopCarCount;
      } else {
        // 获取缓存购物车商品信息
        _this.nowShopCarCount = cart.getIdAmount(_this.commodityId);
      }

      if (_this.nowShopCarCount >= _this.inventory) {
        alert('库存不足');
        return false;
      }

      this.$emit('modifyShopCarCount','recommendList',_this.index,_this.parentIndex);
      // 分组件后，数据？..._this.recommendList要怎么处理？console.log(_this['recommendList'][1]);
      //Vue.set(_this.recommendList[index],'shopCarCount',list.shopCarCount + 1);

      // 修改购物车数量
      if (isLogin) {
        // 提交商品到购物车
        this.$http.post('/community/addGoodsToCart', {
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "goodsId": _this.commodityId,
          "quantity": 1
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode != 0) {
            alert(res.msg);
            return false;
          }
          // 修改底部购物车值
          _this.$emit('shoppingNum',res.data.totalCount);
        }).catch(function(error) {
          console.log(error)
        })

      } else {
        // 修改本地缓存中数据
        cart.increase(this.commodityId);
        // 修改底部购物车值
        //_this.$refs.appnav.shoppingNum = cart.getAmount();
        _this.$emit('shoppingNum',cart.getAmount());
      }
      //
    },
    // 删除单件商品
    remove:function(){
      alert('删除')
    }

    /********************************************************************************************************/
  },
  components: {

  }
}
</script>
