<template>


  <div class="wrap">

    <article class="main">

      <div class="loginInfo" v-if="!isLogin">
        <router-link :to="{path:'login',query:{projectId:projectId,url:'shopping'}}"><span>登录</span>登录后同步当前和原购物车中的商品</router-link>
      </div>

      <div class="mainScroll shoppingCart" v-show="isLists">
        <div class="shoppingTitle">
          <h3>锦艺便利</h3>
          <span @click="edit">{{isDel ? '完成' : '编辑'}}</span>
        </div>

        <template v-for="(cartGoodsList,parentIndex) in lists.cartGoodsList">

          <div class="explain" v-if="cartGoodsList.activityId">
            <span v-if="cartGoodsList.activityIcon == 1">满减</span>
            <span v-else-if="cartGoodsList.activityIcon == 2">满折</span>
            <span v-else-if="cartGoodsList.activityIcon == 3">满赠</span>
            <p>{{cartGoodsList.discountStr}}</p>
          </div>

          <ul class="shoppingList">

            <li v-for="(list,index) in cartGoodsList.goodsList" v-if="list.quantity" v-bind:key="index">

              <div class="shoppingCheck">
                <input type="checkbox" :id="'id' + list.goodsId" name="checkSingle" :value="list.goodsId" v-model="checkCommodityId" />
                <label :for="'id' + list.goodsId"></label>
              </div>

              <router-link :to="{path:'commodity',query: { id: list.goodsId,projectId:projectId }}" class="photo">
                <img :src="list.imageUrl" alt="">
                <i class="activity" v-if="list.isActivity == 1">活动</i>
                <i class="goIng" v-if="list.ifFlashSale != 0">抢购中</i>
                <span class="hint" v-if="list.quantity > list.inventory">库存不足</span>
                <span class="hint" v-if="list.status == 0">失效</span>
              </router-link>
              <div class="box">
                <router-link :to="{path:'commodity',query: { id: list.goodsId,projectId:projectId }}">
                  <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.goodsName}}</h3>
                  <div class="bottom">
                    <strong class="price" v-if="list.ifFlashSale > 0">{{list.flashSalePrice / 1000}}<b>元/{{list.unit}}</b></strong>
                    <strong class="price" v-else>{{list.price / 1000}}<b>元/{{list.unit}}</b></strong>
                    <span class="limit" v-if="list.amountLimit > 0">限购{{list.amountLimit}}件</span>
                    <car-count v-if="list.status !== 0" @modifyShopCarCount="modifyShopCarCount" @modifyNotLoginCarList="modifyNotLoginCarList" @shoppingNum="shoppingNum" :type="false" :index="index" :parent-index="parentIndex" :list="'shopping'" :commodity-id="list.goodsId" :is-house-user="list.isHouseUser.toString()" :shop-car-count="list.quantity" :inventory="list.inventory"></car-count>
                  </div>
                </router-link>
              </div>
            </li>

          </ul>
        </template>

      </div>

      <not-data v-show="isNotData"></not-data>

      <modal-toast ref="modalToast"></modal-toast>

    </article>
    <footer>

      <div class="footerInfo" v-if="lists.distributionStr">
        {{lists.distributionStr}}
      </div>

      <div class="footerCart" v-if="isDel">
        <div class="box" @click="checkAll()">
          <div class="checkAll" :class="{'select':checkedAllModel}"></div>
          <!--<input id="delAll" type="checkbox" v-model="checkedAllModel" />-->
          <label for="">全选</label>
        </div>
        <div class="next del" @click="del">删除</div>
      </div>
      <div class="footerCart" v-else>
        <div class="box" @click="checkAll()">
          <div class="checkAll" :class="{'select':checkedAllModel}"></div>
          <!--<input id="checkAll1" type="checkbox" v-model="checkedAllModel" />-->
          <label for="">全选</label>
          <div class="total">
            <span v-if="lists.totalMoney">合计:<b>￥{{lists.totalMoney / 1000 | price}}</b></span>
            <span v-else>合计：<b>￥0.00</b></span>
            <em v-if="lists.discountMoney">已优惠￥{{lists.discountMoney / 1000}}</em>
          </div>
        </div>

        <div class="next" @click="toPay(lists.ifCanOrder,lists.distributionStr)">去结算({{lists.goodsNum ? lists.goodsNum : '0'}})</div>
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
 "totalCount": 5,                 // jsp中没使用？
 "totalAllMoney": 10930,          // jsp中没使用？
 "goodsNum": 0,                   // 去结算(1)...没值...需要选中
 "totalMoney": 0                  // ...没值...需要选中

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
        "amountLimit": "",          // 购买限制数量v....大概应该可能还有别的用处？
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


  app 加减库存没有重新请求


*/
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import appNav from '../common/appNav.vue';
import carCount from '../common/carCount.vue';
import cart from '../../plugins/cart'
import notData from '../common/notData.vue'
import modalToast from '../common/modalToast.vue'
import {opModal} from '../../plugins/common'

export default {
  name: 'shopping',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      isNotData:false,          // 是否显示当前无商品提示
      isLists:false,            // 是否显示列表
      lists:'',
      isLogin : simplestorage.get('HLXK_UserId') != -1,
      isDel:false,
      checkCommodityId:[],         // 商品id
      checkedAllModel:false,       // 全选、反选
      saveCheckNum:""              // 保存选中值，用于编辑->完成
    }
  },
  mounted() {

    this.init();

  },
  methods: {
    init:function(){
      let _this = this;
      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });

      if(_this.isLogin){

        // 查询本地缓存数据
        var goodsInfo = cart.queryAll();

        if(goodsInfo.length > 0){
          // 合并本地缓存购物车跟服务器端购物车数据
          var jsonStr = cart.queryAllJsonStr(true);

          // 批量添加购物车商品
          this.$http.post('/community/mergeCartGoods', {
            "projectId":simplestorage.get('projectId'),
            "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
            "goodsInfo":jsonStr
          },{
            "encryptType":1
          }).then(function(res) {
            //console.log(res);
            if (res.resultCode == 0) {
              // 删除本地缓存
              cart.removeAll();
              // 显示购物车数据
              _this.initPoint();
            }else if(res.resultCode == 1000){
              _this.$router.replace({
                path: '/guest',
                query: {
                  url: _this.$router.currentRoute.fullPath,
                  projectId:simplestorage.get('projectId')
                }
              })
            }else{
              _this.$refs.modalToast.toast({
                txt:res.msg
              });
              return false;
            }

          }).catch(function(error) {
            console.log(error)
            opModal.toast({
              txt:'连接超时！'
            })
            return false;
          })

        }else{
          _this.initPoint();
        }

      }else {
        _this.initPoint();
      }

    },
    initPoint:function(){
      let _this = this;

      if(_this.isLogin){

        // 购物车详情.加载到未选中数据......
        this.$http.post('/community/getCartInfo', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          //"checkGoodsInfo":"[{goodsId:500148,amount:1}]",       // 传了会返回选中的信息...
          //"checkAll": 1           // 传不传没多大不同...
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode == 0) {

            if(res.data.cartGoodsList.length > 0){
              // 显示数据列表
              _this.isLists = true;
              // 加载购物车数据
              _this.lists = res.data;
              // 设置为上一次选中状态
              _this.loadCheck()
              //_this.checkAll()
              // 修改底部的值
              _this.$refs.appnav.shoppingNum = res.data.totalCount;
            }else{
              // 显示无数据
              _this.isNotData = true;
            }
            // 隐藏加载中
            _this.$refs.modalToast.is = false;
            // console.log(JSON.stringify(_this.lists))

          }else if(res.resultCode == 1000){
            _this.$router.replace({
              path: '/guest',
              query: {
                url: _this.$router.currentRoute.fullPath,
                projectId:simplestorage.get('projectId')
              }
            })
          }else{
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
          }

        }).catch(function(error) {
          console.log(error)
          opModal.toast({
            txt:'连接超时！'
          })
          return false;
        })

      }else{

        var jsonStr = cart.queryAllJsonStr();
        //var checkJsonStr = _this.getCheckGoods();       // jsp中没登录那来的数据？

        // 未登录.加载.本地缓存购物车信息查询
        this.$http.post('/community/getCartInfoByGoodsInfo', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          //"checkGoodsInfo":"[{goodsId:100516,amount:1}]",       // 传了会返回选中的信息
          "goodsInfo": jsonStr
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode == 0) {

            if(res.data.cartGoodsList.length > 0){
              // 显示数据列表
              _this.isLists = true;
              // 加载购物车数据
              _this.lists = res.data;
              // 设置为上一次选中状态
              _this.loadCheck()
              //_this.checkAll()
            }else{
              // 显示无数据
              _this.isNotData = true;
            }
            // 隐藏加载中
            _this.$refs.modalToast.is = false;
            //console.log(JSON.stringify(_this.lists))

          }else if(res.resultCode == 1000){
            _this.$router.replace({
              path: '/guest',
              query: {
                url: _this.$router.currentRoute.fullPath,
                projectId:simplestorage.get('projectId')
              }
            })
          }else{
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
          }

        }).catch(function(error) {
          console.log(error)
          opModal.toast({
            txt:'连接超时！'
          })
          return false;
        })

      }

    },
    // 获取购物车选中数据
    getCheckShopping:function(){
      let _this = this;
      let url;

      //// 登录、未登录............................
      if(_this.isLogin){

        // 购物车详情
        _this.$http.post('/community/getCartInfo', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "checkGoodsInfo":_this.getCheckGoods()
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode == 0) {

            // 加载购物车数据
            _this.lists = res.data;
            // console.log(JSON.stringify(_this.lists))

            // 是否全选
            _this.isAll()

          }else if(res.resultCode == 1000){
            _this.$router.replace({
              path: '/guest',
              query: {
                url: _this.$router.currentRoute.fullPath,
                projectId:simplestorage.get('projectId')
              }
            })
          }else{
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
          }



        }).catch(function(error) {
          console.log(error)
          opModal.toast({
            txt:'连接超时！'
          })
          return false;
        })

      }else{

        var jsonStr = cart.queryAllJsonStr();

        // 未登录.加载.本地缓存购物车信息查询
        this.$http.post('/community/getCartInfoByGoodsInfo', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "checkGoodsInfo":_this.getCheckGoods(),       // 传了会返回选中的信息
          "goodsInfo": jsonStr
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res);
          if (res.resultCode == 0) {

            // 加载购物车数据
            _this.lists = res.data;
            //console.log(JSON.stringify(_this.lists))
            // 是否全选
            _this.isAll()

          }else if(res.resultCode == 1000){
            _this.$router.replace({
              path: '/guest',
              query: {
                url: _this.$router.currentRoute.fullPath,
                projectId:simplestorage.get('projectId')
              }
            })
          }else{
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
          }



        }).catch(function(error) {
          console.log(error)
          opModal.toast({
            txt:'连接超时！'
          })
          return false;
        })

      }

    },
    // 获取全部商品json
    getCheckGoods :function(str){
      let _this = this;
      let jsonStr = "[";

//      if(_this.isLogin){

        // 只有选中状态需要
        for(let i = 0;i < _this.checkCommodityId.length;i++){
          _this.lists.cartGoodsList.forEach(function(item){
            item.goodsList.forEach(function(goodsList,index){
              if(_this.checkCommodityId[i] == goodsList.goodsId && goodsList.quantity != undefined){
                if (i != 0) {
                  jsonStr += ","
                }
                if(str == "pay"){
                  jsonStr += "{goodsId:" + goodsList.goodsId + ",amount:" + goodsList.quantity + ",price:" + goodsList.price +"}"
                }else{
                  jsonStr += "{goodsId:" + goodsList.goodsId + ",amount:" + goodsList.quantity + "}"
                }
              }
            })
          });
        }

//      }else{
//        let HLXK_SHOPPING = simplestorage.get('HLXK_SHOPPING');
//
//        _this.checkCommodityId.forEach(function(value,i){
//          HLXK_SHOPPING.forEach(function(goodsList){
//            if(value == goodsList.id){
//              if (i != 0) {
//                jsonStr += ","
//              }
//              if(str == "pay"){
//                jsonStr += "{goodsId:" + goodsList.id + ",amount:" + goodsList.amount + ",price:" + goodsList.price +"}"
//              }else{
//                jsonStr += "{goodsId:" + goodsList.id + ",amount:" + goodsList.amount + "}"
//              }
//            }
//          });
//
//        })
//
//      }

      jsonStr += "]";
      return jsonStr;
    },
    // 获取没有选中的商品
    getNotCheckGoods:function(){

      let _this = this;
      let jsonStr = "[";

      if(_this.isLogin){

        for(let i = 0;i < _this.checkCommodityId.length;i++){
          _this.lists.cartGoodsList.forEach(function(item){
            item.goodsList.forEach(function(goodsList,index){
              if(_this.checkCommodityId[i] != goodsList.goodsId && goodsList.quantity != undefined){
                if (i != 0) {
                  jsonStr += ","
                }
                jsonStr += "{goodsId:" + goodsList.goodsId + ",amount:" + goodsList.quantity + "}"
              }
            })
          });
        }

      }else{
        let HLXK_SHOPPING = simplestorage.get('HLXK_SHOPPING');

        _this.checkCommodityId.forEach(function(value,i){
          HLXK_SHOPPING.forEach(function(goodsList){
            if(value != goodsList.id){
              if (i != 0) {
                jsonStr += ","
              }
              jsonStr += "{goodsId:" + goodsList.goodsId + ",amount:" + goodsList.quantity + "}"
            }
          });

        })

      }

      jsonStr += "]";
      return jsonStr;

    },
    // 进入加载上次选中情况
    loadCheck:function(){
      let _this = this;
      let checkCommodityId = simplestorage.get('checkCommodityId').toString();

      // 第一次checkCommodityId还没这个字段？undefined.有问题....
      // 非第一次，用户不选择商品、去结算删除，后checkCommodityId == ''
      if(checkCommodityId == undefined){
        // 全选
        _this.checkAll();
      }else{
        // 用户选择的商品
        if(checkCommodityId != ''){
          // 得到用户选中的值
          let arr = checkCommodityId.split(",");
          // 清空选中的值
          _this.checkCommodityId = [];

          // 添加全选值
          arr.forEach(function(item){
            _this.checkCommodityId.push(item);
          });

          ////////////////////////////////////////////////// 失效状态 ////////////////
//          this.lists.cartGoodsList.forEach(function(goods){
//            goods.goodsList.forEach(function(list){
//              if(list.status == 0){
//                arr.forEach(function(item,index){
//                  // 移除失效id
//                  if(list.goodsId == item){
//                    _this.checkCommodityId.splice(index, 1);
//                  }
//                });
//              }
//            })
//          })

        }
      }

    },
    // 是否全选
    isAll:function(){

      let len = 0;
//      for(let i = 0;i < this.lists.cartGoodsList.length; i++){
//        if(this.lists.cartGoodsList[i].goodsList.status == 1){
//          len += this.lists.cartGoodsList[i].goodsList.length;
//        }
//      }

      this.lists.cartGoodsList.forEach(function(goods){
        goods.goodsList.forEach(function(list){
          // 非失效
//          if(list.status == 1){
            len += 1;
//          }
        })
      })



      // 是否全选或没全选
      if(this.checkCommodityId.length == len && this.checkCommodityId.length > 0){
        this.checkedAllModel = true;
      }else{
        this.checkedAllModel = false;
      }

    },
    // 全选
    checkAll:function(){
      var _this = this;

      if (_this.checkedAllModel) {   //反选
        // 清空选中的值
        _this.checkCommodityId = [];
        // 全选值
        _this.checkedAllModel = false;

      }else{  //全选
        // 清空选中的值
        _this.checkCommodityId = [];
        // 添加全选值
        _this.lists.cartGoodsList.forEach(function(item){
          item.goodsList.forEach(function(goodsList){
            // 上架商品.选中
//            if(goodsList.status == 1){
              _this.checkCommodityId.push(goodsList.goodsId);
//            }
          })
        });
        // 全选值
        _this.checkedAllModel = true;
      }

      // 重新获取没选中数据
      _this.getCheckShopping();
    },
    // 编辑、完成
    edit:function(){
      let _this = this;
      //this.isDel = !this.isDel;

      if(_this.isDel){
        // 完成
        _this.isDel = false;

        for(let i = 0;i < _this.saveCheckNum.length;i++){
          _this.lists.cartGoodsList.forEach(function(item){
            item.goodsList.forEach(function(goodsList,index){
              if(_this.saveCheckNum[i] == goodsList.goodsId){
                _this.checkCommodityId.push(goodsList.goodsId);
              }
            })
          });
        }
      }else{
        // 编辑
        _this.isDel = true;
        // 保存选中值
        _this.saveCheckNum = _this.checkCommodityId;
        // 清空全选
        _this.checkCommodityId = [];
        // 全选值
        _this.checkedAllModel = false;
      }
    },
    // 删除购物车商品按钮
    del:function(){
      let _this = this;

      if(_this.checkCommodityId.length <= 0){
        _this.$refs.modalToast.toast({
          txt:'请选择商品'
        });
        return false;
      }

      opModal.alert({
        content:"确认删除选中的商品吗？",
        ok:"确定",
        onOk:function(){

          // 显示加载中
          _this.$refs.modalToast.toast({
            txt:'加载中',
            icon:'loading',
            time:0
          });

          if(_this.isLogin){

            let str = _this.checkCommodityId.toString();
            let getNotCheckGoods = _this.getNotCheckGoods();

            // 批量删除
            _this.$http.post('/community/delCartGoodsArray', {
              "projectId":simplestorage.get('projectId'),
              "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
              "goodsIds": str,
              //"checkAll":"1",   //购物车选中的商品信息
              //"checkGoodsInfo":"[{goodsId:500152,amount:1},{goodsId:500145,amount:1},{goodsId:500148,amount:1}]"  //购物车剩下的商品信息
              "checkGoodsInfo":getNotCheckGoods
            },{
              "encryptType":1
            }).then(function(res) {
              //console.log(res);
              if (res.resultCode == 0) {

                // 加载购物车数据
                _this.lists = res.data;
                // 修改底部的值
                _this.$refs.appnav.shoppingNum = res.data.totalCount;
                // 隐藏加载中
                _this.$refs.modalToast.is = false;
                _this.checkCommodityId = [];

              }else if(res.resultCode == 1000){
                _this.$router.replace({
                  path: '/guest',
                  query: {
                    url: _this.$router.currentRoute.fullPath,
                    projectId:simplestorage.get('projectId')
                  }
                })
              }else{
                _this.$refs.modalToast.toast({
                  txt:res.msg
                });
              }

            }).catch(function(error) {
              console.log(error)
              opModal.toast({
                txt:'连接超时！'
              })
              return false;
            })

          }else {

            //删除一组缓存数据商品
            cart.removeIds(_this.checkCommodityId);

            var jsonStr = cart.queryAllJsonStr();

            // 未登录.加载.本地缓存购物车信息查询
            _this.$http.post('/community/getCartInfoByGoodsInfo', {
              "projectId":simplestorage.get('projectId'),
              "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
              "goodsInfo": jsonStr
            },{
              "encryptType":1
            }).then(function(res) {
              //console.log(res);
              if (res.resultCode == 0) {

                // 加载购物车数据
                _this.lists = res.data;
                // 修改底部的值
                _this.$refs.appnav.shoppingNum = res.data.totalCount;
                // 隐藏加载中
                _this.$refs.modalToast.is = false;
                //console.log(JSON.stringify(_this.lists))

                _this.checkCommodityId = [];

              }else if(res.resultCode == 1000){
                _this.$router.replace({
                  path: '/guest',
                  query: {
                    url: _this.$router.currentRoute.fullPath,
                    projectId:simplestorage.get('projectId')
                  }
                })
              }else{
                _this.$refs.modalToast.toast({
                  txt:res.msg
                });
              }

            }).catch(function(error) {
              console.log(error)
              opModal.toast({
                txt:'连接超时！'
              })
              return false;
            })

          }

        },
        cancel:'取消',
        onCancel:function(){

        }
      })

    },
    // 去结算
    toPay:function(is,str){
      let _this = this;

      // 选中的商品的数据
      if(_this.checkCommodityId.length > 0){

        // is:是否可下单；str：描述信息
        if(!is){
          _this.$refs.modalToast.toast({
            txt:str
          });
          return false;
        }

        if(_this.isLogin){
          // 验证库存
          this.$http.post('/community/checkOrderInfo', {
            "projectId":simplestorage.get('projectId'),
            "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
            "goodsInfo":_this.getCheckGoods()
          },{
            "encryptType":1
          }).then(function(res) {
            //console.log(res);
            if (res.resultCode == 0) {
              // 去结算页面
              _this.$router.push({ path: '/payorder', query: {
                "goodsInfo": _this.getCheckGoods('pay'),
                'isGroupBuyingOrder':0,
                'isFlashOrder':0
              }})

            }else if(res.resultCode == 4105 || res.resultCode ==4201){
              _this.$refs.modalToast.toast({
                txt:res.msg
              });
              return false;
            }else if(res.resultCode == 1000){
              _this.$router.replace({
                path: '/guest',
                query: {
                  url: _this.$router.currentRoute.fullPath,
                  projectId:simplestorage.get('projectId')
                }
              })
            }else{
              _this.$refs.modalToast.toast({
                txt:res.msg
              });
              return false;
            }
          }).catch(function(error) {
            console.log(error)
            opModal.toast({
              txt:'连接超时！'
            })
            return false;
          })
        }else{
          // 去结算页面
          _this.$router.push({ path: '/payorder', query: {
            "goodsInfo": _this.getCheckGoods('pay'),
            'isGroupBuyingOrder':0,
            'isFlashOrder':0
          }})
        }

      }else{
        _this.$refs.modalToast.toast({
          txt:'请选择商品'
        });
      }

    },
    /************************************************************************************************/
    // 修改列表中已添加购物车值
    modifyShopCarCount:function(type,list,index,parentIndex,id,num){
      let _this = this;

      if(type == 'add'){
        Vue.set(_this.lists.cartGoodsList[parentIndex].goodsList[index],'quantity',_this.lists.cartGoodsList[parentIndex].goodsList[index].quantity + 1);
      }else if(type == 'del'){

        if(num == 1){
          // 手动删除购物车商品checkCommodityId值
          _this.checkCommodityId.forEach(function(value,index){
            if(value == id){
              // 移除
              _this.checkCommodityId.splice(index, 1);
            }
          })
        }

        Vue.set(_this.lists.cartGoodsList[parentIndex].goodsList[index],'quantity',_this.lists.cartGoodsList[parentIndex].goodsList[index].quantity - 1);
      }
      // 重新获取选中数据
      _this.getCheckShopping();
    },
    // 未登录.修改列表中已添加购物车值
    modifyNotLoginCarList:function(){
      // 重新获取没选中数据
      this.getCheckShopping();
    },
    // 修改底部购物车值
    shoppingNum:function(num){
      this.$refs.appnav.shoppingNum = num;
    }
  },
  components: {
    appNav,
    carCount,
    notData,
    modalToast
  },
  watch: {
    // 是否全部选中
    checkCommodityId:function(){

      // 保存选中值
      simplestorage.set('checkCommodityId', this.checkCommodityId.toString());

      // 重新获取选中数据
      this.getCheckShopping();

    }
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/shopping.scss"></style>
