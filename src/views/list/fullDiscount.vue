<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll sale" v-if="!isData">
        <ul class="saleList">
          <li v-for="(list,index) in lists">
            <router-link class="photo" :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}">
              <img :src="list.url" alt="">
              <i class="activity" v-if="list.isActivity == 1">活动</i>
              <i class="goIng" v-if="list.isFlashSale == 1 && list.flashSaleStatus == 1">抢购中</i>
            </router-link>
            <div class="box">
              <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}">
                <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                <div class="price">
                  {{list.price / 1000 | price}}<b>元/{{list.unit}}</b>
                </div>
                <div class="bottom">
                  <template>已售{{list.count}}</template>
                  <car-count :type="false" ref="carcount" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.isFlashSale != 1 && list.inventory > 0" :index="index" :commodity-id="list.commodityId" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </div>

      <not-data v-if="isData"></not-data>

      <modal-toast ref="modalToast"></modal-toast>

    </article>

    <footer>
      <footer-cart ref="footerCart"></footer-cart>
    </footer>

  </div>

</template>
<script>
/*

{
  "userId": null,
  "isActivity": "1",
  "isFlashSale": "",
  "flashSalePrice": "",
  "price": 10,
  "unit": "件",
  "communityType": "1",
  "inventory": 1000,
  "flashSaleStatus": "",
  "priceYuan": 0.01,
  "shopCarCount": 0,
  "count": 0
}

*/
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import notData from '../common/notData.vue';
import modalToast from '../common/modalToast.vue';
import carCount from '../common/carCount.vue';
import footerCart from '../common/footerCart.vue'
import {opModal} from '../../plugins/common'

export default {
  name: 'fullDiscount',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      lists:'',
      isData:false
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
      // 获取数据列表
      this.$http.post('/community/getActivityCommodityPage', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        'activityId':this.$route.query.id,
        "type":3,
        'pageIndex':1,
        'pageSize':30
      },{
        "encryptType":1
      }).then(function(res){
        console.log(res);
        if(res.resultCode == 0){
          // 隐藏加载中
          _this.$refs.modalToast.is = false;
          _this.lists = res.data.data;
          //console.log(JSON.stringify(_this.lists));
          // 无数据
          if(_this.lists.length <= 0){
            _this.isData = true;
          }
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

    },
    /************************************************************************************************/
    // 未登录修改底部购物车值
    shoppingNum:function(num){
      if(simplestorage.get('HLXK_UserId') == -1){
        this.$refs.footerCart.selectNum = num;
      }
    },
    // 修改列表中已添加购物车值
    modifyShopCarCount:function(type,list,index){
      let _this = this;
      if(type == 'add'){
        Vue.set(_this.lists[index],'shopCarCount',_this.lists[index]['shopCarCount'] + 1);
      }else if(type == 'del'){
        Vue.set(_this.lists[index],'shopCarCount',_this.lists[index]['shopCarCount'] - 1);
      }
      // 加载购物车信息...未登录没在这
      _this.$refs.footerCart.init()
    },
  },
  components: {
    notData,
    modalToast,
    carCount,
    footerCart
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/sale.scss"></style>
