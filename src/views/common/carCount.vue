<template>

  <div v-if="type" class="oneNum" @click.stop.prevent="add($event)"></div>
  <div v-else class="selectNum">
    <div class="remove" v-show="num > 0" @click.stop.prevent="remove()"></div>
    <input type="text" v-show="num > 0" value="1" v-model="num" readonly="readonly" />
    <div class="add" @click.stop.prevent="add($event)"></div>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import Bus from '../../plugins/bus'
import cart from '../../plugins/cart'
import {opModal} from '../../plugins/common'
import $ from 'jquery'
import {Parabola} from '../../plugins/parabola'

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
    isHouseUser:{
      type:String     // 是否住户专享
    },
    shopCarCount:{    // 接口上，每个商品已添加到购物车数
      type:Number
    },
    inventory:{       // 商品库存
      type:Number
    }
  },
  data() {
    return{
      num:0           // 每个商品已添加到购物车数
    }
  },
  mounted() {


    this.getShopCarCount();

  },
  methods: {
    // 商品购物车数量
    getShopCarCount:function(){
      let _this = this;

      let isLogin = simplestorage.get('HLXK_UserId') != -1;
      // 登录
      if (isLogin) {
        // 获取缓存购物车商品信息
        _this.num = _this.shopCarCount;
      }else{
        // 获取缓存购物车商品信息
        _this.num = cart.getIdAmount(_this.commodityId);
      }
    },
    // 添加购物车
    add:function(event){
      let _this = this;
      let isLogin = simplestorage.get('HLXK_UserId') != -1;
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
        opModal.toast({
          txt:'库存不足'
        })
        return false;
      }

      // 购物车页面
      if(_this.list == 'shopping'){
        // 显示加载中...
        var div = document.createElement("div");
        var html = '<div class="box"><i class="loading"></i><span>加载中</span></div>';
        div.className = 'modalToast';
        div.innerHTML = html;
        document.body.appendChild(div);
      }

      // 修改购物车数量
      if (isLogin) {
        // 提交商品到购物车
        this.$http.post('/community/addGoodsToCart', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "goodsId": _this.commodityId,
          "quantity": 1
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode === 0) {

            _this.$emit('modifyShopCarCount','add',_this.list,_this.index,_this.parentIndex);
            // 分组件后，数据？..._this.recommendList要怎么处理？console.log(_this['recommendList'][1]);
            //Vue.set(_this.recommendList[index],'shopCarCount',list.shopCarCount + 1);

            // 修改底部购物车值
            _this.$emit('shoppingNum',res.data.totalCount);
            // 底部购物车动画使用
            _this.$emit('increment', event.target);

            // 把这件商品设置在购物车为选中.是否有值
            _this.saveCheckCommodityId()

          }else if(res.resultCode === 8002){
            opModal.alert({
              content:"此商品只有该小区住户才能购买",
              ok:"验证",
              onOk:function(){
                location.href = propertyAuth + '/api/pub/estate/auth?communityId='+ simplestorage.get('HLXK_DISTRIBUTION').id +'&redirect_uri=' + encodeURIComponent(location.href);
              },
              cancel:'放弃',
              onCancel:function(){

              }
            })
            return false;
          }else if(res.resultCode === 8003){
            opModal.alert({
              content:"此商品只有该小区住户才能购买",
              ok:"放弃",
              onOk:function(){

              }
            })
            return false;
          }else if(res.resultCode === 8004 || res.resultCode === 8005){
            _this.$router.push({
              path: '/login',
              projectId:simplestorage.get('projectId')
            })
          }else{
            alert(res.msg);
            return false;
          }

          // 购物车页面
          if(_this.list == 'shopping'){
            // 移除加载中
            div.parentNode.removeChild(div);
          }

        }).catch(function(error) {
          console.log(error)
        })

      } else {
        if(_this.isHouseUser == 1){
          opModal.alert({
            content:"此商品只有该小区住户才能购买",
            ok:"验证",
            onOk:function(){
              location.href = propertyAuth + '/api/pub/estate/auth?communityId='+ simplestorage.get('HLXK_DISTRIBUTION').id +'&redirect_uri=' + encodeURIComponent(location.href);
            },
            cancel:'放弃',
            onCancel:function(){

            }
          })
          return false;
        }

        // 修改本地缓存中数据
        cart.increase(_this.commodityId);
        // 修改底部购物车值
        _this.$emit('shoppingNum',cart.getAmount());

        // 把这件商品设置在购物车为选中
        _this.saveCheckCommodityId()

        // 判断type
        if(!_this.type){
          _this.num = cart.getIdAmount(_this.commodityId);
        }
        // 给购物车页面使用
        _this.$emit('modifyNotLoginCarList');
        // 底部购物车动画使用
        _this.$emit('increment', event.target);

        // 购物车页面
        if(_this.list == 'shopping'){
          // 移除加载中
          div.parentNode.removeChild(div);
        }

      }

    },
    // 删除单件商品
    remove:function(){
      let url;
      let _this = this;
      let isLogin = simplestorage.get('HLXK_UserId') != -1;

      // 购物车页面
      if(_this.list == 'shopping'){
        // 显示加载中...
        var div = document.createElement("div");
        var html = '<div class="box"><i class="loading"></i><span>加载中</span></div>';
        div.className = 'modalToast';
        div.innerHTML = html;
        document.body.appendChild(div);
      }

      if(isLogin){

        if(_this.num <= 1){
          url = '/community/delCartGoods';          // 等于1件的时候，删除本商品全部库存
        }else{
          url = '/community/addGoodsToCart';        // 1件1件减少
        }

        this.$http.post(url, {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "goodsId": _this.commodityId,
          "quantity": -1,
          "checkAll":1
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode == 0) {

            _this.$emit('modifyShopCarCount','del','recommendList',_this.index,_this.parentIndex);
            // 修改底部购物车值
            _this.$emit('shoppingNum',res.data.totalCount);
          }else if(res.resultCode === 8002){
            opModal.alert({
              content:"此商品只有该小区住户才能购买",
              ok:"验证",
              onOk:function(){
                location.href = propertyAuth + '/api/pub/estate/auth?communityId='+ simplestorage.get('HLXK_DISTRIBUTION').id +'&redirect_uri=' + encodeURIComponent(location.href);
              },
              cancel:'放弃',
              onCancel:function(){

              }
            })
            return false;
          }else if(res.resultCode === 8003) {
            //用户未认证
            opModal.alert({
              content:"此商品只有该小区住户才能购买",
              ok:"放弃",
              onOk:function(){
              }
            })
            return false;
          }else if(res.resultCode === 8004 || res.resultCode === 8005){
            _this.$router.push({ path: '/login'})
          }else{
            alert(res.msg);
            return false;
          }

          // 购物车页面
          if(_this.list == 'shopping'){
            // 移除加载中
            div.parentNode.removeChild(div);
          }

        }).catch(function(error) {
          console.log(error)
        })
      }else{

        // 购物车页面只剩下1件时
        if(_this.shopCarCount == 1 && _this.list == 'shopping'){

          opModal.alert({
            content:"是否删除该商品?",
            ok:"确定",
            onOk:function(){
              // 删除用户选中记录
              let _this = this;
              let checkCommodityId = simplestorage.get('checkCommodityId');
              alert(checkCommodityId)

              // 减少商品数
              cart.reduce(_this.commodityId);
              // 修改底部购物车值
              _this.$emit('shoppingNum',cart.getAmount());
              _this.num = cart.getIdAmount(_this.commodityId);
              // 给购物车页面使用
              _this.$emit('modifyNotLoginCarList');

            },
            cancel:'取消',
            onCancel:function(){

            }
          })

        }else{

          // 减少商品数
          cart.reduce(_this.commodityId);
          // 修改底部购物车值
          _this.$emit('shoppingNum',cart.getAmount());
          _this.num = cart.getIdAmount(_this.commodityId);
          // 给购物车页面使用
          _this.$emit('modifyNotLoginCarList');

        }

        // 购物车页面
        if(_this.list == 'shopping'){
          // 移除加载中
          div.parentNode.removeChild(div);
        }

      }
    },
    // 保存为购物车选中值
    saveCheckCommodityId:function(){
      let _this = this;
      let id = _this.commodityId.toString();

      // 把这件商品设置在购物车为选中.是否有值
      let checkCommodityId = simplestorage.get('checkCommodityId').toString();
      if(checkCommodityId){
        if(checkCommodityId.indexOf(id) == -1){
          // 有值添加
          simplestorage.set('checkCommodityId', checkCommodityId + ',' + id);
        }
      }else{
        simplestorage.set('checkCommodityId', id);
      }

    },
    // 也要删除...
    delCheckCommodityId:function(){
      
    }
  },
  components: {

  },
  watch: {
    shopCarCount: function () {
      this.getShopCarCount();
    }
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_selectNum.scss"></style>
