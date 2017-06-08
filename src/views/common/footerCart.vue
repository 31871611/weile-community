<template>

  <div class="footerAddCart">
    <div class="total">
      合计：<b id="end">￥{{totalPrice / 1000}}</b><em>(已选{{selectNum}}件)</em>
    </div>
    <router-link class="next" :to="{path:'shopping',query:{projectId:projectId}}">
      下一步
    </router-link>
  </div>

</template>
<script>
/**

 未登录显示购物车数量
 已登录
 显示用户已选的件数与价格

 本地有选中id
 购物车接口需要商品信息才会返回价格
 getCartInfo会返回购物车全部商品信息
 从中过滤出已选中商品信息在次提交获得已选中商品信息.价格、数量

 **/
import simplestorage from 'simplestorage.js'
//import Bus from '../../plugins/bus'
import {opModal} from '../../plugins/common'
import cart from '../../plugins/cart'

export default {
  //name: 'appNav',
  props:{

  },
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      isLogin : simplestorage.get('HLXK_UserId') != -1,
      lists:'',              // 购物车数据
      totalPrice:0,
      selectNum:0
    }
  },
  created: function() {

  },
  mounted() {

    // 获取购物车
    this.init();

  },
  methods: {
    init:function(){
      let _this = this;

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
            }else{
              opModal.toast({
                txt:res.msg
              })
              return false;
            }

          }).catch(function(error) {
            console.log(error)
          })

        }else{
          _this.initPoint();
        }

      }else {
        //_this.initPoint();

        //获取缓存购物车商品信息
        _this.selectNum = cart.getAmount();
        alert(1)

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
          if (res.resultCode != 0) {
            opModal.toast({
              txt:res.msg
            })
            return false;
          }
          // 加载购物车数据
          _this.lists = res.data;
          // 选中数据
          _this.getCheckShopping()


        }).catch(function(error) {
          console.log(error)
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
          if (res.resultCode != 0) {
            opModal.toast({
              txt:res.msg
            })
            return false;
          }
          // 加载购物车数据
          //_this.lists = res.data;
          // 选中数据
          //_this.getCheckShopping()

        }).catch(function(error) {
          console.log(error)
        })

      }

    },
    // 获取购物车选中数据
    getCheckShopping:function(){
      let _this = this;

      if(!simplestorage.get('checkCommodityId')) return false

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
          if (res.resultCode != 0) {
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
            return false;
          }

          // 数量
          _this.selectNum = res.data.goodsNum
          // 价格
          _this.totalPrice = res.data.totalMoney

        }).catch(function(error) {
          console.log(error)
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
          console.log(res);
          if (res.resultCode != 0) {
            opModal.toast({
              txt:res.msg
            })
            return false;
          }

          // 数量
          _this.selectNum = res.data.goodsNum
          // 价格
          _this.totalPrice = res.data.totalMoney

        }).catch(function(error) {
          console.log(error)
        })

      }

    },
    // 获取全部选中商品json
    getCheckGoods :function(str){
      let _this = this;
      let checkCommodityId = simplestorage.get('checkCommodityId').split(",");

      let jsonStr = "[";

      if(_this.isLogin){

        // 只有选中状态需要
        for(let i = 0;i < checkCommodityId.length;i++){
          _this.lists.cartGoodsList.forEach(function(item){
            item.goodsList.forEach(function(goodsList,index){
              if(checkCommodityId[i] == goodsList.goodsId && goodsList.quantity != undefined){
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

      }else{
        let HLXK_SHOPPING = simplestorage.get('HLXK_SHOPPING');

        checkCommodityId.forEach(function(value,i){
          HLXK_SHOPPING.forEach(function(goodsList){
            if(value == goodsList.id){
              if (i != 0) {
                jsonStr += ","
              }
              if(str == "pay"){
                jsonStr += "{goodsId:" + goodsList.id + ",amount:" + goodsList.amount + ",price:" + goodsList.price +"}"
              }else{
                jsonStr += "{goodsId:" + goodsList.id + ",amount:" + goodsList.amount + "}"
              }
            }
          });

        })

      }

      jsonStr += "]";
      return jsonStr;
    }

  },
  components: {

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_footerAddCart.scss"></style>
