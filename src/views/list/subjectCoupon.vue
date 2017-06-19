<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll subjectCoupon">
        <div class="adPhoto" v-for="(list,index) in lists.imageList">
          <img :src="list.imageUrl" alt="">
        </div>

        <ul class="subjectCouponList">

          <li v-for="(list,index) in lists.data">
            <router-link :to="{path:'userCoupon/details',query:{id:list.couponId,projectId:projectId}}">
              <div class="left">
                <strong class="Price"><b>￥</b>{{list.faceValue / 1000}}</strong>
                <span class="txt">订单满{{list.orderMoney / 1000}}元</span>
                <span class="txt">(不含运费)可用</span>
              </div>
              <div class="right">
                <h3 v-if="list.couponType == 0">全店通用(团购商品除外)</h3>
                <h3 v-else-if="list.couponType == 1">指定商品适用</h3>
                <h3 v-else-if="list.couponType == 2">指定品类适用</h3>
                <h3 v-else-if="list.couponType == 3">指定商品适用</h3>
                <h3 v-else>{{list.couponType}}</h3>
                <em>{{list.effectiveTime}} - {{list.failureTime}}</em>
                <span class="set" :class="{'select':list.stock <= 0}" @click.stop.prevent="getCoupon(list.couponId,list.getLimit)">立即领取</span>
                <!--可用券-->
                <i class="steVoucher"></i>
                <!--箭头-->
                <i class="arrowR"></i>
              </div>
            </router-link>
          </li>

        </ul>

        <modal-toast ref="modalToast"></modal-toast>

      </div>

    </article>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue'
import {opModal} from '../../plugins/common'

export default {
  name: 'subjectCoupon',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      lists:[]
    }
  },
  mounted() {

    let _this = this;
    // 获取数据列表
    this.$http.post('/community/getThematicCommodityPage', {
      "projectId":simplestorage.get('projectId'),
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      'thematicId':this.$route.query.id,
      'pageIndex':1,
      'pageSize':20
    },{
      "encryptType":1
    }).then(function(res){
      console.log(res);
      if(res.resultCode == 0){
        _this.lists = res.data;
      }else{
        _this.$refs.modalToast.toast({
          txt:res.msg
        });
      }
      //console.log(JSON.stringify(_this.lists));

    }).catch(function(error) {
      console.log(error)
      opModal.toast({
        txt:'连接超时！'
      })
      return false;
    })

  },
  methods: {
    // 领取优惠券
    getCoupon:function(id,limit){
      let _this = this;
      //alert(id + '|' + limit);

      this.$http.post('/community/getStoreCouponToUser', {
        "projectId":simplestorage.get('projectId'),
        "storeId": simplestorage.get('HLXK_DISTRIBUTION').id,
        "couponId": id
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
        _this.$refs.modalToast.toast({
          txt:'领取成功'
        });

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
<style scoped lang="scss" src="../../assets/styles/subjectCoupon.scss"></style>
