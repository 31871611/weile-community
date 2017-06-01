<template>
<div class="view">

  <div class="wrap">
    <header>
      <div class="search">
        <router-link to="search" class="box">
          <i></i>
          <input type="search" placeholder="搜索" />
        </router-link>
        <span class="exit">取消</span>
      </div>
      <div class="scrollNotice">
        <i></i>
        <div ref="scrollConter">
          <span class="begin">便利店配送时间：17:00-21:00。联系电话：0371-55372728。配送小区：{{distributionCommunityName}}</span>
          <span class="end"></span>
        </div>
      </div>
    </header>
    <article class="main scrollHide">
      <!--<div class="storeContent"></div>-->
        <div class="classifyList">
          <ul class="">
            <li :class="{'select':currentIndex === -1}" @click="selectMenu(-1)">所用商品</li>
            <li v-for="(list,index) in lists" :class="{'select':currentIndex == list.categoryId}" @click="selectMenu(list.categoryId)">{{list.categoryName}}</li>
          </ul>
        </div>

        <div class="contentList" ref="contentList">

          <ul class="" v-for="(commoditys,parentIndex) in lists" v-show="currentIndex == commoditys.categoryId">

            <li v-for="(list,index) in commoditys.commoditys">
              <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}" class="photo">
                <img :src="list.url" :alt="list.commodityId">
                <i class="activity" v-if="list.isActivity == 1">活动</i>
                <i class="goIng" v-if="list.isFlashSale == 1 && list.flashSaleStatus == 1">抢购中</i>
              </router-link>
              <div class="box">
                <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}">
                  <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                  <div class="bottom">
                    <strong class="price" v-if="list.isFlashSale == '' || list.flashSaleStatus == 0">{{list.price / 1000}}<b>元/{{list.unit}}</b></strong>
                    <strong class="price" v-if="list.isFlashSale == 1">{{list.flashSalePrice / 1000}}<b>元/{{list.unit}}</b></strong>
                    <div class="go" v-if="list.isFlashSale == 1">
                      马上抢
                    </div>
                    <!--{{list.inventory}}-->
                    <car-count ref="carcount" @increment="incrementTotal" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.isFlashSale != 1" :type="false" :index="index" :parent-index="parentIndex" :commodity-id="list.commodityId" :is-house-user="list.isHouseUser" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                  </div>
                </router-link>
              </div>
            </li>

          </ul>

          <ul class="" v-for="(commoditys,parentIndex) in lists" v-show="currentIndex == -1">

            <li v-for="(list,index) in commoditys.commoditys">
              <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}" class="photo">
                <img :src="list.url" :alt="list.commodityId">
                <i class="activity" v-if="list.isActivity == 1">活动</i>
                <i class="goIng" v-if="list.isFlashSale == 1 && list.flashSaleStatus == 1">抢购中</i>
              </router-link>
              <div class="box">
                <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}">
                  <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                  <div class="bottom">
                    <strong class="price" v-if="list.isFlashSale == '' || list.flashSaleStatus == 0">{{list.price / 1000}}<b>元/{{list.unit}}</b></strong>
                    <strong class="price" v-if="list.isFlashSale == 1">{{list.flashSalePrice / 1000}}<b>元/{{list.unit}}</b></strong>
                    <div class="go" v-if="list.isFlashSale == 1">
                      马上抢
                    </div>
                    <!--{{list.inventory}}-->
                    <car-count ref="carcount" @increment="incrementTotal" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.isFlashSale != 1" :type="false" :index="index" :parent-index="parentIndex" :commodity-id="list.commodityId" :is-house-user="list.isHouseUser" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                  </div>
                </router-link>
              </div>
            </li>

          </ul>

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

  <modal-toast ref="modalToast"></modal-toast>

</div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import appNav from '../common/appNav.vue';
import carCount from '../common/carCount.vue';
import modalToast from '../common/modalToast.vue'

export default {
  name: 'store',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      distributionCommunityName:simplestorage.get('HLXK_DISTRIBUTION').name,
      distributionCommunityId:simplestorage.get('HLXK_DISTRIBUTION').id,
      isLogin:simplestorage.get('HLXK_UserId') != -1,
      lists:'',                                       // 便利店列表
      currentIndex:''                                 // 分类索引
    }
  },
  mounted() {

    this.getList();               //获取列表
    //this.getCommodityCarInfo();   // 获取购物车数量和金额

    // 滚动公告
    this.$nextTick(function(){
      this.scrollLeft();
    });


  },
  methods: {
    scrollLeft:function(){
      let scrollConter = this.$refs.scrollConter;
      let begin = scrollConter.querySelector('.begin');
      let end = scrollConter.querySelector('.end');
      end.innerHTML = begin.innerHTML;
      function Marquee() {
        //console.log(end.offsetWidth + '|' + scrollConter.scrollLeft)
        if (end.offsetWidth - scrollConter.scrollLeft <= 0){
          scrollConter.scrollLeft -= begin.offsetWidth;
        }else{
          scrollConter.scrollLeft++;
        }
      }
      let MyMar = setInterval(Marquee, 50);
    },
    // 获取列表数据
    getList:function(){
      let _this = this;
      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });
      // 加载购物车数据
      this.$http.post('/community/getCommodityCategoryListAndCommoditys', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId":_this.distributionCommunityId
      },{
        "encryptType":0
      }).then(function(res) {
        //console.log(res);
        if (res.resultCode != 0) {
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
          return false;
        }
        _this.lists = res.data;
        // 设置分类id
        if(_this.lists.length > 0){
          _this.currentIndex = _this.$route.query.id || -1;
        }else{
          _this.currentIndex = -1;
        }
        //console.log(JSON.stringify(_this.lists))
        // 隐藏加载中
        _this.$refs.modalToast.is = false;

      }).catch(function(error) {
        console.log(error)
      })
    },
    // 获取购物车数量和金额
    getCommodityCarInfo:function(){
      let _this = this;

      if(_this.isLogin){

        // 没有发现这个接口.......app没有这个功能....
        this.$http.post('/commodity/getCommodityCarInfo', {
          "projectId":simplestorage.get('projectId'),
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
      this.$router.push({ path: '/shopping'})
    },
    // 购物车动画
    incrementTotal(target) {
      this.$refs.appnav.drop(target);
    }

  },
  components: {
    appNav,
    carCount,
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/store.scss"></style>
