<template>

  <div class="wrap">

    <article class="main">
      <div class="mainScroll shoppingCart">
        <div class="shoppingTitle">
          <h3>锦艺便利</h3>
          <span @click="edit">{{isDel ? '完成' : '编辑'}}</span>
        </div>

        <template v-for="(cartGoodsList,parentIndex) in lists.cartGoodsList">

          <div class="explain" v-if="lists.cartGoodsList.activityId">
            <span v-if="lists.cartGoodsList.activityIcon == 1">满减</span>
            <span v-else-if="lists.cartGoodsList.activityIcon == 2">满折</span>
            <span v-else-if="lists.cartGoodsList.activityIcon == 3">满赠</span>
            <p>{{lists.cartGoodsList.discountStr}}</p>
          </div>

          <ul class="shoppingList">

            <li v-for="(list,index) in cartGoodsList.goodsList" v-if="list.quantity">

              <input type="checkbox" name="checkSingle" :value="list.goodsId" v-model="delCommodityId" />
              <router-link :to="{path:'commodity',query: { id: list.goodsId }}" class="photo">
                <img :src="list.imageUrl" alt="">
                <i class="activity" v-if="list.isActivity == 1">活动</i>
                <i class="goIng" v-if="list.ifFlashSale == 1 && list.flashSaleStatus == 1">抢购中</i>
                <span>库存不足</span>
              </router-link>
              <div class="box">
                <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.goodsName}}</h3>
                <div class="bottom">
                  <strong class="price">{{list.price / 1000 | price}}<b>元/{{list.unit}}</b></strong>
                  <span class="limit" v-if="list.amountLimit">限购{{list.amountLimit}}件</span>

                  <car-count ref="carcount" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.ifFlashSale != 1 && list.inventory > 0" :type="false" :index="index" :parent-index="parentIndex" :commodity-id="list.goodsId" :is-house-user="list.isHouseUser.toString()" :shop-car-count="list.quantity" :inventory="list.inventory"></car-count>

                </div>
              </div>
            </li>

          </ul>

        </template>

      </div>
    </article>
    <footer>
      {{delCommodityId}}
      <div class="footerInfo" v-if="lists.distributionStr">
        {{lists.distributionStr}}
      </div>

      <div class="footerCart" v-if="isDel">
        <div class="box">
          <input id="checkAll" name="checkAll" type="radio" />
          <label for="checkAll">全选</label>
        </div>
        <div class="next del" @click="del">删除</div>
      </div>
      <div class="footerCart" v-else>
        <div class="box">
          <input id="delAll" type="radio" />
          <label for="delAll">全选</label>
          <div class="total">
            <span>合计：<b>￥{{lists.totalAllMoney / 1000 | price}}</b></span>
            <em v-if="lists.discountMoney">已优惠￥{{lists.discountMoney}}</em>
          </div>
        </div>
        <div class="next">去结算(0)</div>
      </div>


      <app-nav ref="appnav" :select-class="'shopping'"></app-nav>
    </footer>
  </div>

</template>
<script>
/*

 "discountInfoStr": "",           // 已优惠
 "distributionStr": "",           // 差1.00元免配送费
 "ifCanOrder": 1,                 // 1,//是否可下单，1可以，0不可以
 "discountMoney": 0,              // jsp中没有？
 "totalCount": 5,                 // jsp中使用？
 "totalAllMoney": 10930,          // jsp中使用？
 "goodsNum": 0,                   // 去结算(1)...没值...需要选中
 "totalMoney": 0                  // ...没值

 "cartGoodsList": [
    "discountStr": "",      // 优惠信息
    "activityId": "",       // 优惠活动Id，空表示没有的优惠的商品
    "activityIcon": "",     // 活动图标：0没有，1满减，2满折，3满赠
    "activityName": ""      // 活动名称
    "goodsList": [
      {
        "goodsId": 25,              //商品Id
        "imageUrl": "http://img.v89.com/group1/M06/07/87/rBAA11f7YM6AULdmAAAbc6umelQ302_227*24_114x114!.jpg",
        "status": 1,                // 商品状态，1上架0下架
        "flashSalePrice": "",       // 抢购价格
        "cartId": 425,              // 购物车Id...jsp中没有用到
        "isActivity": 1             // 优惠活动：1是，0否
        "unit": "件",               // 单位v
        "ifFlashSale": 0,           // 是否抢购活动，0不是，其他是
        "price": 22000,             // 商品价格
        "flashInventory": "",       // 抢购库存
        "sales": 6,                 // 总销量...jsp中已被注释
        "inventory": 20,            // 商品库存
        "userId": 3,                // 用户id...jsp中没有用到
        "quantity": 1,              // 商品数量
        "deleteFlag": false,        // 删除状态
        "amountLimit": "",          // 购买限制数量v
        "goodsName": "新增商品",     // 商品名称v
        "monthSales": 0,            // 月销售数量...jsp中没有用到

        // 本地缓存购物车信息查询...getCartInfoByGoodsInfo
        "isGroupBuyingGoods": false,
        "isHouseUser": 0,           // 文档中没有
        "communityType": "1",       // 文档中没有
        "categoryId": 500059,       // 文档中没有

      }
    ]
 ]


 登录
  有本地数据
    获取本地缓存，提交到购物车(批量提交)->成功->initPoint()
  没本地数据
    initPoint()
 未登录
  initPoint()


 initPoint()
  登录
    加载购物车数据->填充到模版、根据数据加载相关信息
  未登录
    读取本地缓存，提交到缓存购物车->成功->填充到模版、根据数据加载相关信息


  事件处理....未整理


*/
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import appNav from '../common/appNav.vue';
import carCount from '../common/carCount.vue';
import cart from '../../plugins/cart'

export default {
  name: 'shopping',
  data() {
    return{
      lists:'',
      isLogin : simplestorage.get('HLXK_STATUS'),
      isDel:false,
      delCommodityId:[]         // 商品id
    }
  },
  mounted() {
    let _this = this;

    if(_this.isLogin){

      // 合并本地缓存，到服务器购物车
      var goodsInfo = cart.queryAll();

      if(goodsInfo.length > 0){
        // 合并本地缓存购物车跟服务器端购物车数据
        var jsonStr = cart.queryAllJsonStr(true);

        // 批量添加购物车商品
        this.$http.post('/community/mergeCartGoods', {
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "goodsInfo":jsonStr
        },{
          "encryptType":1
        }).then(function(res) {
          console.log(res);
          if (res.resultCode == 0) {
            // 删除本地缓存
            cart.removeAll();
            // 显示购物车数据
            _this.initPoint();
          }else{
            alert(res.msg);
            return false;
          }

        }).catch(function(error) {
          console.log(error)
        })

      }else{
        _this.initPoint();
      }

      // 提示....登录后同步当前和原购物车中的商品....ios好像没有这个功能
      // $(".login-tips").addClass("hide");

    }else {
      _this.initPoint();
    }

  },
  methods: {
    initPoint:function(){
      let _this = this;

      if(_this.isLogin){

        // 购物车详情
        this.$http.post('/community/getCartInfo', {
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          //"checkGoodsInfo":"[{goodsId:100516,amount:1}]",       // 传了会返回选中的信息
          "checkAll": 1
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode != 0) {
            alert(res.msg);
            return false;
          }
          // 加载购物车数据
          _this.lists = res.data;
          // console.log(JSON.stringify(_this.lists))

          // loadCartInfo(list);

        }).catch(function(error) {
          console.log(error)
        })

      }else{

        var jsonStr = cart.queryAllJsonStr();
        var checkJsonStr = _this.getCheckGoods();       // jsp中没登录那来的数据？

        // 未登录.加载.本地缓存购物车信息查询
        this.$http.post('/community/getCartInfoByGoodsInfo', {
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          //"checkGoodsInfo":"[{goodsId:100516,amount:1}]",       // 传了会返回选中的信息
          "goodsInfo": jsonStr
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode != 0) {
            alert(res.msg);
            return false;
          }
          // 加载购物车数据
          _this.lists = res.data;
          //console.log(JSON.stringify(_this.lists))

          //loadCartTotalInfo(list)

        }).catch(function(error) {
          console.log(error)
        })

      }

    },
    getCheckGoods :function(){
      return 'getCheckGoods'
    },
    // 编辑
    edit:function(){
      this.isDel = !this.isDel;
    },
    // 删除购物车商品按钮
    del:function(){
      console.log('del')

      let _this = this;
      for(var i = 0;i < _this.delCommodityId.length; i++){

        //console.log(_this.delCommodityId[i]);

        if(_this.isLogin){

          // 删除
          this.$http.post('/community/delCartGoods', {
            "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
            "goodsId": _this.delCommodityId[i]
          },{
            "encryptType":1
          }).then(function(res) {
            console.log(res);
            if (res.resultCode != 0) {
              alert(res.msg);
              return false;
            }

            //loadTotalInfo();

          }).catch(function(error) {
            console.log(error)
          })

        }else{

          //删除缓存数据商品
          //var cart = common.cart;
          //cart.remove(id);
          //loadTotalInfo();

        }

      }

    },

    /************************************************************************************************/
    // 修改列表中已添加购物车值
    modifyShopCarCount:function(type,list,index,parentIndex){
      let _this = this;
      if(type == 'add'){
        Vue.set(_this.lists.cartGoodsList[parentIndex].goodsList[index],'quantity',_this.lists.cartGoodsList[parentIndex].goodsList[index].quantity + 1);
      }else if(type == 'del'){
        Vue.set(_this.lists.cartGoodsList[parentIndex].goodsList[index],'quantity',_this.lists.cartGoodsList[parentIndex].goodsList[index].quantity - 1);
      }
    },
    // 修改底部购物车值
    shoppingNum:function(num){
      this.$refs.appnav.shoppingNum = num;
    }
  },
  components: {
    appNav,
    carCount
  }
}
</script>
<style lang="scss" src="../../assets/styles/shopping.scss"></style>
