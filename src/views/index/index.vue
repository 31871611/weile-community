<template>
<div class="h">

  <div class="wrap">
    <article class="main">
      <div class="mainScroll index">

        <div class="currentQuarters" @click="goSelectQuarters(true)">
          <span>{{textCurrentQuarters}}</span>
          <i></i>
        </div>

        <slider :items="sliderList" :width="750" :height="280" :speed="5000" :sync="true"></slider>

        <div class="indexNav">
          <a href="" class="open">小区开门</a>
          <a href="" class="repair">物业报修</a>
          <a href="" class="complain">投诉建议</a>
          <a href="" class="payment">生活缴费</a>
        </div>

        <div class="categoryHomeLayoutList">
          <ul>
            <li v-for="list in categoryHomeLayoutList">
              <a href="">
                <img :src="list.imageUrl" alt="">
              </a>
            </li>
          </ul>
        </div>

        <div class="groupBuy">
          <div class="title">
            <h2>团购</h2>
            <a href="" class="more">更多<i></i></a>
          </div>
          <div class="scroll">
            <ul>
              <li v-for="list in groupBuyList">
                <a href="">
                  <img :src="list.url" alt="">
                  <h3>{{list.name}}</h3>
                  <div class="price">
                    <b>￥</b><strong>{{list.priceYuan}}</strong>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="recommend">
          <div class="title">
            <h2>推荐商品</h2>
            <a href="" class="more">更多<i></i></a>
          </div>
          <ul>
            <li v-for="list in recommendList">
              <div class="content">
                <i class="activity">活动</i>
                <i class="goIng">抢购中</i>
                <router-link :to="{path:'commodity/' + list.commodityId}" class="photo">
                  <img :src="list.url" :alt="list.commodityId">
                </router-link>
                <h3>{{list.name}}</h3>
                <div class="bottom">
                  <div class="price">
                    <b>￥</b><strong>{{list.priceYuan}}</strong>
                  </div>
                  <div class="go">
                    马上抢
                  </div>
                  <div class="num">
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </article>
    <footer>
      <div class="appNav">
        <router-link to="/" class="home">首页</router-link>
        <router-link to="a" class="community">社区</router-link>
        <router-link to="store" class="convenient">便利店</router-link>
        <router-link to="c" class="shopping">购物车</router-link>
        <router-link to="d" class="my">我的</router-link>
      </div>
    </footer>

  </div>

  <select-quarters v-if="isSelectQuarters" @back="goSelectQuarters" @select="selectCurrentQuarters"></select-quarters>
</div>

</template>
<script type="text/ecmascript-6">
import selectQuarters from './selectQuarters.vue';
import slider from './slider.vue';

export default {
  name: 'home',
  data() {
    return {
      sliderList:[
        {src:'http://cms-bucket.nosdn.127.net/4b54654acfbb459f876b7127d448c5da20170407122527.jpeg?imageView&thumbnail=750y380&quality=45&type=webp&interlace=1&enlarge=1',href:'/home/'},
        {src:'http://img1.126.net/channel19/027392/750380_0405.jpg',href:'/home/'}
      ],
      textCurrentQuarters:'锦艺测试小区',
      isSelectQuarters:false,
      categoryHomeLayoutList : null,
      groupBuyList : null,
      recommendList : null
    }
  },
  mounted() {
    let _this = this;

    this.$http.post('/community/homePage', {
        distributionCommunityId: 10
      })
      .then(function(res) {
        // console.log(res)
        let data = res.data || {}
        if (res.resultCode == 0) {

          // 活动专区
          _this.categoryHomeLayoutList = data.categoryHomeLayoutList;
          // 团购商品
          _this.groupBuyList = data.groupBuy.data;
          // 商品推荐
          _this.recommendList = data.recommend.data;
//          console.log(JSON.stringify(_this.recommendList));
          console.log(data.categoryHomeLayoutList);

        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  methods: {
    goSelectQuarters:function(is){
      // 显示
      this.isSelectQuarters = is
    },
    selectCurrentQuarters:function(txt){
      this.textCurrentQuarters = txt;
    }
  },
  components: {
    selectQuarters,
    slider
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/index.scss"></style>
