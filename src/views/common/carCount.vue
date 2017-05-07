<template>

  <div v-if="type" class="num" @click="add()"></div>
  <div v-else class="selectNum">
    {{shopCarCount}}
    <div class="remove" v-show="shopCarCount > 0" @click="remove()"></div>
    <input type="text" v-show="shopCarCount > 0" value="1" v-model="shopCarCount" />
    <div class="add" @click="add()"></div>
  </div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import cart from '../../plugins/cart'

export default {
  props:{
    list:{            // 列表数据字段
      type:String
    },
    type:{            // 添加到购物车类型：true、只有添加；false、有减.数量.加
      type:Boolean,
      default: true
    },
    index:{
      type:Number     // 商品列表索引
    },
    parentIndex:{     // 商品列表父级索引
      type:Number
    },
    commodityId:{     // 商品id
      type:Number
    },
    shopCarCount:{    // 已登录，每个商品已添加到购物车数
      type:Number
    },
    inventory:{       // 商品库存
      type:Number
    }
  },
  data() {
    return{
      is:true
    }
  },
  mounted() {
    // 未登录时读取个个商品已添加到购物车数
    let _this = this;
    // 未登录时传入的是0，会报错........
    console.log(_this.shopCarCount);
    let isLogin = simplestorage.get('HLXK_STATUS');
    // 未登录
    if (!isLogin) {
      // 获取缓存购物车商品信息
      _this.shopCarCount = cart.getIdAmount(_this.commodityId);
    }

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
        shopCarCount = _this.shopCarCount;
      } else {
        // 获取缓存购物车商品信息
        shopCarCount = cart.getIdAmount(_this.commodityId);
      }

      if (shopCarCount >= _this.inventory) {
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
        // 判断type
        if(!_this.type){
          _this.shopCarCount = cart.getIdAmount(_this.commodityId);
        }
      }
      //
    },
    // 删除单件商品
    remove:function(){
      let _this = this;
      let isLogin = simplestorage.get('HLXK_STATUS');

      if(isLogin){

        // 会删除本商品全部....
        this.$http.post('/community/delCartGoods', {
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "goodsId": _this.commodityId,
          "quantity": -1,
          "checkAll":1
        },{
          "encryptType":1
        }).then(function(res) {
          console.log(res);
          if (res.resultCode == 0) {
            // 修改底部购物车值
            _this.$emit('shoppingNum',res.data.totalCount);
          }else if(data.code === 8002){
            // 用户未认证

          }else if(data.code === 8003) {
            //用户未认证

          }else if(data.code ===8004 || data.code ===8005){
            window.location.href = '/login';
          }else{
            alert(res.msg);
            return false;
          }

        }).catch(function(error) {
          console.log(error)
        })
      }else{

        // 目前值
        console.log(_this.shopCarCount);

        alert('未登录.删除')

/*
        // 修改本地缓存中数据
        cart.increase(this.commodityId);
        // 修改底部购物车值
        //_this.$refs.appnav.shoppingNum = cart.getAmount();
        _this.$emit('shoppingNum',cart.getAmount());
        // 判断type
        if(!_this.type){
          _this.shopCarCount = cart.getIdAmount(_this.commodityId);
        }
*/
      }

      alert('删除')
    }

    /********************************************************************************************************/
  },
  components: {

  }
}
</script>
