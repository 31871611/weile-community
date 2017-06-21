<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll subject">
        <div class="adPhoto" v-for="(list,index) in lists.imageList">
          <img :src="list.imageUrl" alt="">
        </div>


        <div class="subjectList">

          <ul>
            <li v-for="(list,index) in lists.data">
              <div class="content">
                <i class="activity" v-if="list.isActivity == 1">活动</i>
                <i class="goIng" v-if="list.isFlashSale == 1 && list.flashSaleStatus == 1">抢购中</i>
                <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}" class="photo">
                  <img :src="list.url" :alt="list.commodityId">
                </router-link>
                <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                <div class="bottom">
                  <div class="price">
                    <b>￥</b>
                    <strong v-if="list.isFlashSale == '' || list.flashSaleStatus == 0">{{list.price / 1000 | price}}</strong>
                    <strong v-if="list.isFlashSale == 1">{{list.flashSalePrice / 1000 | price}}</strong>
                  </div>
                  <div class="go" v-if="list.isFlashSale == 1">
                    马上抢
                  </div>

                  <car-count ref="carcount" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.isFlashSale != 1 && list.inventory > 0" :index="index" :commodity-id="list.commodityId" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                </div>
              </div>
            </li>

          </ul>
        </div>


        <div class="mostFooter">
          <span>已经到最底了</span>
        </div>
      </div>

      <!--&lt;!&ndash; 浮动购物车 &ndash;&gt;-->
      <!--<router-link to="shopping" class="floatShopping">-->
        <!--<b v-if="floatShoppingNum">{{floatShoppingNum}}</b>-->
      <!--</router-link>-->

    </article>
    <footer>
      <footer-cart ref="footerCart"></footer-cart>
    </footer>
  </div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import carCount from '../common/carCount.vue';
import cart from '../../plugins/cart'
import footerCart from '../common/footerCart.vue'
import {opModal} from '../../plugins/common'

export default {
  name: 'subject',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      lists:[]
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList:function(){
      let _this = this;
      // 获取数据列表
      this.$http.post('/community/getThematicCommodityPage', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
        'thematicId':this.$route.query.id,
        'pageIndex':1,
        'pageSize':30
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode != 0){
          _this.lists = res.data;
          //console.log(JSON.stringify(_this.lists));
        }else if(res.resultCode == 1000){
          _this.$router.replace({
            path: '/guest',
            query: {
              url: _this.$router.currentRoute.fullPath,
              projectId:simplestorage.get('projectId')
            }
          })
        }else{
          opModal.toast({
            txt:res.msg
          })
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
        Vue.set(_this.lists.data[index],'shopCarCount',_this.lists.data[index]['shopCarCount'] + 1);
      }else if(type == 'del'){
        Vue.set(_this.lists.data[index],'shopCarCount',_this.lists.data[index]['shopCarCount'] - 1);
      }
      // 加载购物车信息...未登录没在这
      _this.$refs.footerCart.init()
    }
  },
  components: {
    carCount,
    footerCart
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/subject.scss"></style>
