<template>

  <div class="wrap fullPosition">
    <article class="main">
      <div class="mainScroll couponDetails" v-show="is">

        <ul class="userCouponList">
          <li>
            <a href="javascript:;">
              <div class="left">
                <strong class="Price"><b>￥</b>{{lists.faceValue / 1000}}</strong>
                <span class="txt">订单满{{lists.orderMoney / 1000}}元</span>
                <span class="txt">(不含运费)可用</span>
              </div>
              <div class="right">
                <h3 v-if="lists.couponType == 0">全店通用(团购商品除外)</h3>
                <h3 v-else-if="lists.couponType == 1">指定商品适用</h3>
                <h3 v-else-if="lists.couponType == 2">指定品类适用</h3>
                <h3 v-else-if="lists.couponType == 3">指定商品适用</h3>
                <h3 v-else>{{lists.couponType}}</h3>
                <em>{{lists.effectiveTime}} - {{lists.failureTime}}</em>
                <!--可用券-->
                <i class="steVoucher"></i>
                <span class="explain" v-if="lists.whetherSuperpositionUse == 1">不与其他优惠活动叠加使用</span>
              </div>
            </a>
          </li>
        </ul>

        <template v-if="lists.couponType == 1">
          <div class="title" v-if="lists.storeGoodList">
            <h2>适用商品</h2>
          </div>
          <ul class="goods" v-if="lists.storeGoodList">
            <li v-for="good in lists.storeGoodList">
              <router-link :to="{path:'/commodity',query:{id:good.goodId,projectId:projectId}}">
                <img :src="good.image" alt="">
                <p>{{good.goodName}}</p>
              </router-link>
            </li>
          </ul>
          <div class="not" v-else>
            当前没有适用商品
          </div>
        </template>

        <template v-else-if="lists.couponType == 2">
          <div class="title" v-if="lists.storeGoodsCategoryList">
            <h2>适用品类</h2>
          </div>
          <div class="applyCategory" v-if="lists.storeGoodsCategoryList">
            <ul>
              <li v-for="category in lists.storeGoodsCategoryList">
                <!-- 去便利店分类 -->
                <router-link :to="{path:'/store',query:{id:category.goodsCategoryId,projectId:projectId}}">
                  {{category.goodsCategoryName}}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="not" v-else>
            当前没有适用品类
          </div>
        </template>

        <template v-else-if="lists.couponType == 3">
          <!-- 不知道连接去哪.3.指定商品专题活动 -->
          <div class="titleLink" v-if="lists.activityId">
            <router-link :to="{path:'/',query:{id:lists.activityId,projectId:projectId}}">
              <h2>查看适用商品</h2>
              <i></i>
            </router-link>
          </div>
          <div class="not" v-else>
            当前没有适用商品
          </div>
        </template>

        <template v-else>
          <!-- 去便利店 -->
          <div class="titleLink">
            <router-link :to="{path:'/store',query:{projectId:projectId}}">
              <h2>查看适用商品</h2>
              <i></i>
            </router-link>
          </div>
        </template>


        <div class="title" v-if="lists.explain">
          <h2>使用说明</h2>
        </div>
        <div class="illustrate" v-if="lists.explain">
          <p>{{lists.explain}}</p>
        </div>

      </div>


      <modal-toast ref="modalToast"></modal-toast>

    </article>

  </div>

</template>
<script>
/*

"activityId": "优惠券适用商品专题编号-仅限指定商品专题类型优惠券有数据",

"couponType": "优惠券类型
  0.全程通用
  1.指定商品
  2.商品分类
  3.指定商品专题活动, 状态有4种, ui上提示根据策划规定的显示",

"storeGoodList": [

   "image": "商品图片地址",
   "goodId": "商品编号",
   "goodName": "商品名称"

],//优惠券适用商品列表--仅限指定商品类型优惠券有数据

"storeGoodsCategoryList": [
      "goodsCategoryId": "商品分类编号",
      "goodsCategoryName": "商品分类名称"

],//优惠券适用商品分类列表--仅限指定商品分类类型优惠券有数据


*/
import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue'
import {opModal} from '../../plugins/common'

export default {
  name: 'couponDetails',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      is:false,
      lists:''
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
      // 获取数据列表...只有请求地址.传的参数，与我的优惠券不同
      this.$http.post('/community/getStoreCouponDetail', {
        "projectId":simplestorage.get('projectId'),
        "communityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "couponId":_this.$route.query.id
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode != 0){
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
          return false;
        }
        // 显示列表
        _this.is = true;

        _this.lists = res.data;
        //console.log(JSON.stringify(res.data));
        // 隐藏加载中
        _this.$refs.modalToast.is = false;
      }).catch(function(error) {
        console.log(error)
        opModal.toast({
          txt:'连接超时！'
        })
        return false;
      })

    }
  },
  components: {
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/couponDetails.scss"></style>
