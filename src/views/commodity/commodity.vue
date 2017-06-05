<template>
<div class="view">

  <div class="wrap">
    <article class="main">
      <div class="mainScroll commodity">

        <div class="commodityPhoto">
          <img v-for="img in list.urls" :src="img" alt="">
        </div>

        <!-- "isFlash": 0,//是否抢购活动：0不是，1是 -->
        <template v-if="list.isFlash === 1">
          <!-- 抢购倒记时-未开始.当前时间还没到活动开始时间 -->
          <div class="commodityRushTime" v-if="list.nowTime < list.startTime && list.flashSaleInventory > 0">
            <div class="priceNum">
              <span class="price"><b>￥</b>{{list.flashSalePrice / 1000 | price}}</span>
              <div>
                <span class="originalCost">￥{{list.price / 1000 | price}}</span>
                <span class="limit" v-if="list.amountLimit">限购{{list.amountLimit}}件</span>
              </div>
            </div>

            <div class="time">
              <p>距开抢 {{countdown}}</p>
              <div class="start">{{list.startTimeStr}}开抢</div>
              <i></i>
            </div>
          </div>

          <!--抢购进行中-->
          <div class="commodityRushGo" v-if="list.nowTime > list.startTime &&list.flashSaleInventory > 0">

            <div class="priceNum">
              <i class="iconClock"></i>
              <div class="endTime">
                <span>距结束</span>
                <span>{{countdown}}</span>
              </div>
            </div>

            <div class="time">
              <p>剩余{{list.flashSaleInventory}}件</p>
              <div class="start">已抢{{list.flashPercent}}%</div>
              <i></i>
            </div>
          </div>

          <div class="commodityRushEnd" v-if="list.flashSaleInventory <= 0">
            <h3>特价库存已被抢光...</h3>
            <p>部分用户未付款，还有机会哦</p>
          </div>
        </template>

        <!-- 价格、原价、库存，的显示微信与ios不同 -->
        <div class="commodityTitle">
          <h1><b v-if="list.isHouseUser==1">[住户专享]</b>{{list.name}}<i v-if="list.activityId != 0 && list.activityType == 1">活动</i></h1>
          <div class="info">
            <div class="left">
              <div class="priceNum">
                <template v-if="list.originalPrice">
                  <span class="price"><b>￥</b>{{list.price / 1000 | price}}</span>
                </template>
                <template v-else>
                  <span class="price" v-if="list.nowTime > list.startTime && list.endTime > list.nowTime && list.flashSaleInventory > 0"><b>￥</b>{{list.flashSalePrice / 1000 | price}}</span>
                  <span class="price" v-else><b>￥</b>{{list.price / 1000 | price}}</span>
                </template>
                <!-- 抢购不显示库存 -->
                <span class="repertory" v-if="list.isFlash === 1 && list.flashSaleInventory > 0"></span>
                <span class="repertory" v-else>(库存{{list.inventory}}件)</span>
              </div>
              <!--
                正常不显示原价
                有原价显示原价
                没原价 && 抢购库存 > 0 显示正常价格
                抢购未开始时不显示原价格

                list.originalPrice //商品原价
                list.flashSaleInventory //抢购库存
              -->


              <span class="originalCost" v-if="list.originalPrice">￥{{list.originalPrice / 1000 | price}}</span>
              <span class="originalCost" v-if="list.nowTime > list.startTime && list.endTime > list.nowTime && !list.originalPrice && list.flashSaleInventory > 0">￥{{list.price / 1000 | price}}</span>
            </div>
            <div class="right">

              <span class="limit" v-if="list.flashSalePrice != null && list.nowTime > list.startTime && list.endTime > list.nowTime && list.flashSaleInventory > 0 && list.flashLimit != 0">限购{{list.flashLimit}}件</span>
              <span class="limit" v-if="list.activityId !=0 && list.flashLimit != 0">限购{{list.flashLimit}}件</span>
              <span class="limit" v-if="list.groupBuy && list.amountLimit != 0">限购{{list.amountLimit}}件</span>

              <div class="selectNum">
                <div class="remove" @click="remove()" :class="{'select':goodsNum == 1}"></div>
                  <input type="text" value="1" v-model="goodsNum" />
                <template v-if="list.isFlash === 1">
                  <div class="add" @click="add()" :class="{'select':goodsNum >= list.flashSaleInventory}"></div>
                </template>
                <template v-else>
                  <div class="add" @click="add()" :class="{'select':goodsNum >= list.inventory}"></div>
                </template>
              </div>

            </div>
          </div>
        </div>


        <ul class="commodityType">
          <li v-if="list.count">销量：{{list.count}}件</li>
          <li v-if="list.spec">规格：{{list.spec}}</li>
        </ul>

        <div class="commodityCue" v-if="list.activityId">{{list.discountStr}}</div>
        <div class="commoditySetCoupon" v-if="!list.groupBuy && couponList.length > 0" @click="couponListAlert">
          <b>优惠券</b>
          <div>
            <span v-for="(coupon,index) in couponList">{{coupon.couponName}}</span>
          </div>
          <i></i>
        </div>

        <div class="commodityContent" v-if="imagesList">
          <h2>图文详情</h2>
          <div class="txt" v-for="txt in imagesList">
            <img :src="txt.img" alt="">
            <!--<div class="video" v-if="txt.video">-->
              <!--<video :src="txt.video" controls="controls">-->
                <!--您的浏览器不支持 video 标签。-->
              <!--</video>-->
            <!--</div>-->
            <p>{{txt.info}}</p>
          </div>
        </div>

        <!-- 领取优惠券弹窗 -->
        <transition name="SlideBottomTop">
          <div class="commoditySetCouponAlert" v-show="isCouponList">
            <ul>
              <li v-for="(coupon,index) in couponList">
                <router-link :to="{path:'userCoupon/details',query:{id:coupon.couponId}}">
                  <div class="left">
                    <strong class="Price"><b>￥</b>{{coupon.faceValue / 1000}}</strong>
                    <span class="txt">订单满{{coupon.orderMoney / 1000}}元</span>
                    <span class="txt">(不含运费)可用</span>
                  </div>
                  <div class="right">
                    <h3 v-if="coupon.couponType == 0">全店通用(团购商品除外)</h3>
                    <h3 v-else-if="coupon.couponType == 1">指定商品适用</h3>
                    <h3 v-else-if="coupon.couponType == 2">指定品类适用</h3>
                    <h3 v-else-if="coupon.couponType == 3">指定商品适用</h3>
                    <h3 v-else>{{coupon.couponType}}</h3>
                    <em>{{coupon.effectiveTime}} - {{coupon.failureTime}}</em>
                    <span class="set" :class="{'select':coupon.stock <= 0}" @click.stop.prevent="getCoupon(coupon.couponId,coupon.getLimit)">立即领取</span>
                    <!--可用券-->
                    <i class="steVoucher"></i>
                    <!--箭头-->
                    <i class="arrowR"></i>
                  </div>
                </router-link>
              </li>
            </ul>
            <div class="btn" @click="couponListAlert">
              关闭
            </div>
          </div>
        </transition>

        <!-- 半透明层 -->
        <div class="opacity" v-show="isCouponList" @click="couponListAlert"></div>


        <modal-toast ref="modalToast"></modal-toast>

      </div>
    </article>
    <footer>

      <!--
          团购商品，是立即购买
          没有库存的显示已售罄
          抢购商品是，显示两个按钮

          单独加入购物车...没了
      -->

      <!-- 有抢购活动时，结束时间 > 现在时间 && 现在时间 > 开始时间 -->
      <template v-if="list.endTime > list.nowTime && list.nowTime > list.startTime">

        <div class="commodityFooterNot" v-if="list.flashSaleInventory <= 0 && list.inventory <= 0">
          <div class="not">已售罄</div>
        </div>

        <!-- 抢购已开始为显示这里 -->
        <div class="commodityFooterNormal" v-if="list.flashSaleInventory > 0">
          <router-link to="/shopping" class="shopping">
            <div><b v-show="shoppingNum">{{shoppingNum}}</b></div>
            <span>购物车</span>
          </router-link>
          <div class="add" @click="addCar()">
            加入购物车
          </div>
          <!-- 抢购 -->
          <div class="pay" @click="pay()">
            立即购买
          </div>
        </div>

      </template>
      <!-- 库存<=0 -->
      <div class="commodityFooterNot" v-else-if="list.inventory <= 0">
        <div class="not">已售罄</div>
      </div>
      <!-- 团购时.单独显示立即购买 -->
      <div class="commodityFooterBuy" v-else-if="list.groupBuy">
        <div class="buy" @click="pay()">立即购买</div>
      </div>
      <!-- 正常商品.抢购未开始 -->
      <div class="commodityFooterNormal" v-else>
        <router-link to="/shopping" class="shopping">
          <div><b v-show="shoppingNum">{{shoppingNum}}</b></div>
          <span>购物车</span>
        </router-link>
        <div class="add" @click="addCar()">
          加入购物车
        </div>
        <div class="pay" @click="pay()">
          立即购买
        </div>
      </div>

      <!-- 什么情况显示？距开抢 -->
      <!--<div class="commodityFooterCart" v-else>-->
        <!--<div class="shopping">-->
          <!--<div><b>1</b></div>-->
        <!--</div>-->
        <!--<div class="price">￥212.00</div>-->
        <!--<div class="add">加入购物车</div>-->
      <!--</div>-->


    </footer>
  </div>


</div>
</template>
<script type="text/ecmascript-6">
import simplestorage from 'simplestorage.js'
import cart from '../../plugins/cart'
import modalToast from '../common/modalToast.vue'
import {opModal} from '../../plugins/common'

let timer;

export default {
  name: 'commodity',
  data() {
    return {
      projectId:simplestorage.get('projectId'),
      isLogin:simplestorage.get('HLXK_UserId') != -1,    // 是否登录
      list:'',                   // 详情数据
      imagesList:'',            //图文详情
      countdown:'',              // 抢购倒记时
      couponList:'',             // 优惠券列表
      isCouponList:false,         // 是否显示优惠券列表
      goodsNum:1,                  // 数量加减，初始数
      shoppingNum:0               // 购物车数量
    }
  },
  mounted() {
    let _this = this;

    // 详情数据
    this.$http.post('/community/getCommodityDetail', {
      "projectId":simplestorage.get('projectId'),
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      "commodityId": this.$route.query.id
    },{
      "encryptType":1
    }).then(function(res) {
      //console.log(res.data);
      if (res.resultCode != 0) {
        _this.$refs.modalToast.toast({
          txt:res.msg
        });
        return false;
      }
      //console.log(JSON.stringify(res.data));
      _this.list = res.data;
      // 图文详情
      if(_this.list.images.length > 0) _this.imagesList = _this.list.images;
      // 计算倒记时
      _this.computeTime(_this.list.nowTime,_this.list.startTime,_this.list.endTime);
      // 获取购物车数
      _this.getCartGoodsNum();

    }).catch(function(error) {
      console.log(error)
    });

    // 优惠券数据
    this.$http.post('/community/getUsableStoreCoupons', {
      "projectId":simplestorage.get('projectId'),
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      "goodIds": this.$route.query.id
    },{
      "encryptType":1
    }).then(function(res) {
      //console.log(res.data);
      if (res.resultCode != 0) {
        _this.$refs.modalToast.toast({
          txt:res.msg
        });
        return false;
      }
      _this.couponList = res.data;
      //console.log(JSON.stringify(_this.couponList));

    }).catch(function(error) {
      console.log(error)
    })

  },
  beforeDestroy:function(){
    clearInterval(timer);
  },
  methods: {
    // 是否显示优惠券列表
    couponListAlert:function(){
      this.isCouponList = !this.isCouponList;
    },
    // 计算抢购倒记时
    computeTime:function(nowTime,startTime,endTime){
      let _this = this;
      if(startTime === 0 && endTime === 0){
        return false;
      }

      timer = setInterval(function(){
        // 现在时间大于活动结束时间
        if(startTime > endTime){
          return false;
        }
        // 剩余时间.结束时间-现在时间
        let surplus = endTime - nowTime;
        // 系统时间加一秒
        nowTime = nowTime + 1000;
        // 剩余时间小于等于0
        if(surplus<=0){
          clearInterval(timer);
          document.querySelector('.commodityRushGo').style.display = 'none';
          console.log('活动已结束！');
          return false;
        }
        //console.log('剩余：'+surplus);

        let ds = 60*60*24*1000,
          d = parseInt(surplus/ds),
          h = parseInt((surplus-d*ds)/(60*60*1000)),
          m = parseInt((surplus - d*ds - h*3600*1000)/(60*1000)),
          s = parseInt((surplus-d*ds-h*3600*1000-m*60*1000)/1000);
        //console.log(d + '天' + h + '小时' + m + '分' + s + '秒');
        if(h < 10) h = '0' + h;
        if(m < 10) m = '0' + m;
        if(s < 10) s = '0' + s;

        _this.countdown = d+'天'+h+':'+m+':'+s;
        //console.log(_this.countdown);
      },1000);
    },
    // 领取优惠券
    getCoupon:function(id,limit){
      let _this = this;

      if(_this.isLogin){

        this.$http.post('/community/getStoreCouponToUser', {
          "projectId":simplestorage.get('projectId'),
          "storeId": simplestorage.get('HLXK_DISTRIBUTION').id,
          "couponId": id
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
          _this.$refs.modalToast.toast({
            txt:'领取成功'
          });
          //_this.couponList = res.data;
          //console.log(JSON.stringify(_this.couponList));

        }).catch(function(error) {
          console.log(error)
        })

      }else{

        opModal.alert({
          content:"您还未登录，无法领取优惠券",
          ok:"登录",
          onOk:function(){
            _this.$router.push({
              path: '/login',
              query:{
                'url':'/commodity?id=' + _this.list.commodityId,
                'projectId':_this.projectId
              }
            });
          },
          cancel:'放弃',
          onCancel:function(){

          }
        })
        return false;

      }
    },
    // 数量-减
    remove:function(){
      if(this.goodsNum == 1){
        return false
      }
      this.goodsNum--;
    },
    // 数量-加
    add:function(){
      // "isFlash": 0,//是否抢购活动：0不是，1是
      // "flashLimit": 0,//限购数量
      // list.inventory 库存
      // "isFlash": 0,//是否抢购活动：0不是，1是
      if(this.list.isFlash == 1){
        //alert('限购')
        if(this.goodsNum >= this.list.amountLimit && this.list.amountLimit !=0 ){
          return;
        }else if(this.goodsNum >= this.list.flashSaleInventory){
          return;
        }
      }else{
        if(this.goodsNum >= this.list.inventory){
          return false
        }
      }
      this.goodsNum++;
    },
    // 购物车数量
    getCartGoodsNum:function(){
      let _this = this;

      // 是否登录.获取购物车数量
      if(_this.isLogin){
        _this.shoppingNum = _this.list.totalShopCarCount
      }else {
        //获取缓存购物车商品信息
        _this.shoppingNum = cart.getAmount();
      }

    },
    // 加入购物车
    addCar:function(){
      //alert('加入购物车')
      let _this = this;

      if(_this.isLogin){

        // 获取购物车数量...每次加载本组件就
        this.$http.post('/community/addGoodsToCart', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "goodsId": _this.list.commodityId,
          "quantity": _this.goodsNum,
          "checkAll":1
        },{
          "encryptType":1
        }).then(function(res) {
          console.log(res)
          if (res.resultCode == 0) {
            _this.shoppingNum = res.data.totalCount
            //$('#shopPrice').text((list.totalMoney/1000).toFixed(2));
            _this.$refs.modalToast.toast({
              txt:'加入购物车成功'
            });
            // 加入购物车动画

          }else if(res.resultCode === 8002){
            //用户未认证
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
            //用户未认证
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
              query:{
                'url':'/commodity?id=' + _this.list.commodityId,
                'projectId':_this.projectId
              }
            });
          } else {
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
            return false;
          }

        }).catch(function(error) {
          console.log(error)
        })


      }else{

        var numbCount = _this.goodsNum + cart.getIdAmount(_this.list.commodityId);
        if(_this.list.isHouseUser == 1){
          opModal.alert({
            content:"此商品只有该小区住户才能购买",
            ok:"登录",
            onOk:function(){
              _this.$router.push({
                path: '/login',
                query:{
                  'url':'/commodity?id=' + _this.list.commodityId,
                  'projectId':_this.projectId
                }
              });
            },
            cancel:'放弃',
            onCancel:function(){

            }
          })
          return false;
        }

        //判断是否抢购商品
        if(_this.list.isFlash === 1){
          if(numbCount > _this.list.amountLimit && _this.list.amountLimit !=0){
            _this.$refs.modalToast.toast({
              txt:'超过商品的抢购数量'
            });
            //$shopCarCount.removeClass('beat loading');
            return false;
          }else if( _this.goodsNum > _this.list.flashSaleInventory){
            _this.$refs.modalToast.toast({
              txt:'商品库存不足'
            });
            //$shopCarCount.removeClass('beat loading');
            return false;
          }
        }else{
          // 限购
          if(numbCount > parseInt(_this.list.flashLimit) && parseInt(_this.list.flashLimit) > 0){
            _this.$refs.modalToast.toast({
              txt:'超过商品的抢购数量'
            });
            //$shopCarCount.removeClass('beat loading');
            return false;
          }
          if(numbCount > parseInt(_this.list.inventory)){
            _this.$refs.modalToast.toast({
              txt:'商品库存不足'
            });
            //$shopCarCount.removeClass('beat loading');
            return false;
          }
        }
        // 添加到本地缓存中
        cart.increase(_this.list.commodityId,_this.goodsNum);

        var jsonStr = cart.queryAllJsonStr();
        // 未登录.加载.本地缓存购物车信息查询...getCartInfoByGoodsInfo
        this.$http.post('/community/getCartInfoByGoodsInfo', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          "goodsInfo": jsonStr,
          //"checkGoodsInfo": jsonStr
        },{
          "encryptType":1
        }).then(function(res) {
          console.log(res);
          if (res.resultCode != 0) {
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
            return false;
          }
          _this.shoppingNum = res.data.totalCount
          //console.log(JSON.stringify(_this.lists))
        }).catch(function(error) {
          console.log(error)
        })
        //$shopCarCount.removeClass('beat loading');
        _this.$refs.modalToast.toast({
          txt:'加入购物车成功'
        });
        //add2cart('.plus','#toShopCar'); // 购物车动画
      }
    },
    // 立即购买、团购
    pay:function(){
      //alert('立即购买、团购、抢购');
      let _this = this;

      // 是否团购
      let groupBuy = _this.list.groupBuy ? 1 : 0;

      if(_this.goodsNum < 1){
        _this.$refs.modalToast.toast({
          txt:'购买数量不能小于1'
        });
        return false;
      }

      // 抢购
      if(_this.list.isFlash === 1){
        if(_this.goodsNum > _this.list.amountLimit && _this.list.amountLimit !=0){
          _this.$refs.modalToast.toast({
            txt:'购买数量不能超过限购数量'
          });
          return false;
        }else if(_this.goodsNum > _this.list.flashSaleInventory){
          _this.$refs.modalToast.toast({
            txt:'库存不足'
          });
          return false;
        }
      }

      let goodsInfo = "[{goodsId:" + _this.list.commodityId + ",amount:" + _this.goodsNum + ",price:" + _this.list.price +"}]"

      if(_this.isLogin){
        // 验证库存
        this.$http.post('/community/checkOrderInfo', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          goodsInfo: goodsInfo
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res)
          if (res.resultCode === 0) {
            // 去结算页面
            _this.$router.push({ path: '/payorder', query: { goodsInfo: goodsInfo, isGroupBuyingOrder:groupBuy ,isFlashOrder:_this.list.isFlash}})
          }else if(res.resultCode === 8002){
            //用户未认证
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
            //用户未认证
            opModal.alert({
              content:"此商品只有该小区住户才能购买",
              ok:"放弃",
              onOk:function(){
              }
            })
            return false;

          }else if(res.resultCode ===8004 || res.resultCode ===8005){
            _this.$router.push({
              path: '/login',
              query:{
                'url':'/commodity?id=' + _this.list.commodityId,
                'projectId':_this.projectId
              }
            });
          } else {
            _this.$refs.modalToast.toast({
              txt:res.msg
            });
            return false;
          }

        }).catch(function(error) {
          console.log(error)
        })

      }else{

        if(_this.list.isHouseUser == 1) {
          opModal.alert({
            content:"此商品只有该小区住户才能购买",
            ok:"登录",
            onOk:function(){
              _this.$router.push({
                path: '/login',
                query:{
                  'url':'/commodity?id=' + _this.list.commodityId,
                  'projectId':_this.projectId
                }
              });
            },
            cancel:'放弃',
            onCancel:function(){

            }
          })
          return false;
        }
        // 去结算页面
        _this.$router.push({
          path: '/payorder',
          query: {
            goodsInfo: goodsInfo,
            isGroupBuyingOrder:groupBuy ,
            isFlashOrder:_this.list.isFlash
          }
        })
      }


    }
  },
  components: {
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/commodity.scss"></style>
