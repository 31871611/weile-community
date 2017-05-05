<template>

  <div class="wrap">
    <header>
      <div class="search">
        <div class="box">
          <i></i>
          <input type="search" placeholder="搜索" />
        </div>
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
      <div class="content">
        <div class="classifyList">
          <ul class="">
            <li :class="{'select':currentIndex === -1}" @click="selectMenu(-1)">所用商品</li>
            <li v-for="(list,index) in lists" :class="{'select':currentIndex === index}" @click="selectMenu(index)">{{list.categoryName}}</li>
          </ul>
        </div>

        <div class="contentList" ref="contentList">

          <ul class="" v-for="(commoditys,index) in lists" v-show="currentIndex === index">

            <li v-for="list in commoditys.commoditys">
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

                  <div class="selectNum" v-if="list.isFlashSale != 1 && list.inventory > 0">
                    <div class="reduce"></div>
                    <input type="text" value="1" />
                    <div class="add" @click="add(index,list)"></div>
                  </div>

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
        <!--<div class="next">下一步</div>-->
      <!--</div>-->
      <app-nav :select-class="'store'"></app-nav>
    </footer>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import appNav from '../common/appNav.vue';

export default {
  name: 'store',
  data() {
    return{
      lists:'',
      currentIndex:-1          // 分类索引
    }
  },
  mounted() {
    let _this = this;
    // 加载购物车数据
    this.$http.post('/community/getCommodityCategoryListAndCommoditys', {
      "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
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
  methods: {
    // 切换分类
    selectMenu:function(index){
      let contentList = this.$refs.contentList;
      let ul = contentList.getElementsByTagName("ul");

      this.currentIndex = index;
      // 滚动值清0
      contentList.scrollTop = 0;
    }
  },
  components: {
    appNav
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/store.scss"></style>
