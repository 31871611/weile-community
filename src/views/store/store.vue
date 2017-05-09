<template>

  <div class="wrap">
    <header>
      <div class="search">
        <router-link to="search" class="box">
          <i></i>
          <input type="search" placeholder="搜索" />
        </router-link>
        <span class="exit">取消</span>
      </div>
      <div class="searchList" style="display: none;">
        <ul>
          <li><a href="">
            <span>111</span>
            <i></i>
          </a></li>
          <li><a href="">
            <span>111</span>
            <i></i>
          </a></li>
        </ul>
        <div class="exit">清除搜索历史</div>

        <div class="notData">
          <div class="box">
            <i></i>
            <span>当前没有数据哦~</span>
          </div>
        </div>
      </div>
      <div class="scrollNotice">
        <i></i>
        <div>
            <p>本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元本店100元</p>
        </div>
      </div>
    </header>
    <article class="main">
      <div class="storeContent">
        <div class="classifyList">
          <ul class="">
            <!--<li :class="{'select':currentIndex === -1}" @click="selectMenu(-1)">所用商品</li>-->
            <li v-for="(list,index) in lists" :class="{'select':currentIndex === index}" @click="selectMenu(index)">{{list.categoryName}}</li>
          </ul>
        </div>

        <div class="contentList" ref="contentList">

          <ul class="" v-for="(commoditys,parentIndex) in lists" v-show="currentIndex === parentIndex">

            <li v-for="(list,index) in commoditys.commoditys">
              <router-link :to="{path:'commodity',query: { id: list.commodityId }}" class="photo">
                <img :src="list.url" :alt="list.commodityId">
                <i class="activity" v-if="list.isActivity == 1">活动{{list.isActivity}}</i>
                <i class="goIng" v-if="list.isFlashSale == 1 && list.flashSaleStatus == 1">抢购中</i>
              </router-link>
              <div class="box">
                <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                <div class="bottom">

                  <strong class="price" v-if="list.isFlashSale == '' || list.flashSaleStatus == 0">{{list.price / 1000 | price}}<b>元/{{list.unit}}</b></strong>
                  <strong class="price" v-if="list.isFlashSale == 1">{{list.flashSalePrice / 1000 | price}}<b>元/{{list.unit}}</b></strong>

                  <div class="go" v-if="list.isFlashSale == 1">
                    马上抢
                  </div>

                  <car-count ref="carcount" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.isFlashSale != 1 && list.inventory > 0" :type="false" :index="index" :parent-index="parentIndex" :commodity-id="list.commodityId" :is-house-user="list.isHouseUser" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>

                </div>
              </div>
            </li>

          </ul>


        </div>
      </div>
    </article>
    <footer>
      <!--<div class="footerCart">-->
        <!--<div class="total">-->
          <!--合计：<b>￥0.00</b><em>(已选0件)</em>-->
        <!--</div>-->
        <!--<div class="next" @click="toShopping">下一步</div>-->
      <!--</div>-->
      <app-nav ref="appnav" :select-class="'store'"></app-nav>
    </footer>
  </div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import appNav from '../common/appNav.vue';
import carCount from '../common/carCount.vue';

export default {
  name: 'store',
  data() {
    return{
      distributionCommunityId:simplestorage.get('HLXK_DISTRIBUTION').id,
      isLogin:simplestorage.get('HLXK_STATUS'),
      lists:'',               // 便利店列表
      currentIndex:0          // 分类索引
    }
  },
  mounted() {

    this.getList();               //获取列表
    //this.getCommodityCarInfo();   // 获取购物车数量和金额

  },
  methods: {
    // 获取列表数据
    getList:function(){
      let _this = this;
      // 加载购物车数据
      this.$http.post('/community/getCommodityCategoryListAndCommoditys', {
        "distributionCommunityId":_this.distributionCommunityId
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res);
        if (res.resultCode != 0) {
          alert(res.msg);
          return false;
        }
        _this.lists = res.data;
        //console.log(JSON.stringify(_this.lists))

      }).catch(function(error) {
        console.log(error)
      })
    },
    // 获取购物车数量和金额
    getCommodityCarInfo:function(){
      let _this = this;

      if(_this.isLogin){

        // 没有这个接口.......app也没有这个功能....
        this.$http.post('/commodity/getCommodityCarInfo', {
          "distributionCommunityId":_this.distributionCommunityId
        },{
          "encryptType":0
        }).then(function(res) {
          console.log(res);
          if (res.resultCode != 0) {
            alert(res.msg);
            return false;
          }
          //_this.lists = res.data;
          //console.log(JSON.stringify(_this.lists))

        }).catch(function(error) {
          console.log(error)
        })

      }else{

        // 未登录，把商品提交，这是什么接口?
        var cart = common.cart;
        var jsonStr = cart.queryAllJsonStr();
        request({
          type: 'POST',
          url: '/storeCart/getCartInfoByGoodsInfo',
          data: {
            goodsInfo: jsonStr,
            checkGoodsInfo: jsonStr
          },
          showLoader: false,
          success: function (data, textStatus, jqXHR) {
            if (data.code === 0) {
              var data = data.data.list;
              $total.text(data.totalCount);
              $carNum.text(data.totalCount);
              var totalPrice = data.totalMoney / 1000
              $totalPrice.text(totalPrice.toFixed(2));
            } else {
              $.toast(data.msg);
            }
          }
        });

      }
    },
    // 切换分类
    selectMenu:function(index){
      let contentList = this.$refs.contentList;
      let ul = contentList.getElementsByTagName("ul");

      this.currentIndex = index;
      // 滚动值清0
      contentList.scrollTop = 0;
    },


    /************************************************************************************************/
    // 修改列表中已添加购物车值
    modifyShopCarCount:function(type,list,index,parentIndex){
      let _this = this;
      if(type == 'add'){
        //console.log(_this.lists[index]['commoditys'][index]['shopCarCount'])  列表.................父index、commoditys固定、下一级index、字段
        Vue.set(_this.lists[parentIndex]['commoditys'][index],'shopCarCount',_this.lists[parentIndex]['commoditys'][index]['shopCarCount'] + 1);
      }else if(type == 'del'){
        Vue.set(_this.lists[parentIndex]['commoditys'][index],'shopCarCount',_this.lists[parentIndex]['commoditys'][index]['shopCarCount'] - 1);
      }
    },
    // 修改底部购物车值
    shoppingNum:function(num){
      this.$refs.appnav.shoppingNum = num;
    },
    toShopping:function(){
      // 下一步---去购物车
      this.$router.push({ path: 'shopping'})
    }

  },
  components: {
    appNav,
    carCount
  }
}
</script>
<style lang="scss" src="../../assets/styles/store.scss"></style>
