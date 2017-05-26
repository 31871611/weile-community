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

                  <car-count ref="carcount" @increment="incrementTotal" @modifyShopCarCount="modifyShopCarCount" @shoppingNum="shoppingNum" v-if="list.isFlashSale != 1 && list.inventory > 0" :index="index" :commodity-id="list.commodityId" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                </div>
              </div>
            </li>

          </ul>
        </div>


        <div class="mostFooter">
          <span>已经到最底了</span>
        </div>
      </div>

      <!-- 浮动购物车 -->
      <router-link to="shopping" class="floatShopping">
        <b v-if="floatShoppingNum">{{floatShoppingNum}}</b>
      </router-link>

      <!-- 小球 -->
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook">
              </div>
            </div>
          </transition>
        </div>
      </div>

    </article>
    <footer>
      <div class="footerCart" v-if="false">
        <div class="total">
          合计：<b>￥0.00</b><em>(已选0件)</em>
        </div>
        <div class="next">下一步</div>
      </div>
    </footer>
  </div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import carCount from '../common/carCount.vue';
import cart from '../../plugins/cart'

export default {
  name: 'subject',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      lists:[],
      floatShoppingNum:0,
      balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
      dropBalls: []
    }
  },
  mounted() {
    this.getList();
    this.getCartGoodsNum();
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
        console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.lists = res.data;
        //console.log(JSON.stringify(_this.lists));

      }).catch(function(error) {
        console.log(error)
      })
    },
    // 购物车数量
    getCartGoodsNum:function(){
      let _this = this;

      // 是否登录.获取购物车数量
      if(simplestorage.get('HLXK_UserId') != -1){
        // 获取购物车数量...每次加载本组件就
        this.$http.post('/community/getCartGoodsNum', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
        },{
          "encryptType":1
        }).then(function(res) {
          console.log(res)
          if (res.resultCode != 0) {
            alert(res.msg);
            return false;
          }
          _this.floatShoppingNum = res.data.cartGoodsNum;
        }).catch(function(error) {
          console.log(error)
        })
      }else{
        //获取缓存购物车商品信息
        _this.floatShoppingNum = cart.getAmount();
      }

    },
    /************************************************************************************************/
    // 修改列表中已添加购物车值
    modifyShopCarCount:function(type,list,index){
      let _this = this;
      if(type == 'add'){
        Vue.set(_this.lists.data[index],'shopCarCount',_this.lists.data[index]['shopCarCount'] + 1);
      }else if(type == 'del'){
        Vue.set(_this.lists.data[index],'shopCarCount',_this.lists.data[index]['shopCarCount'] - 1);
      }
    },
    // 修改底部购物车值
    shoppingNum:function(num){
      this.floatShoppingNum = num;
    },
    // 购物车动画
    incrementTotal(target) {
      //this.drop(target);
      console.log(target);
      //this.drop(target);
    },
    // 动画
    drop(el) {
      console.log(this.balls.length);
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el) {
//          let rf = el.offestHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
      el.style.transform = 'translate3d(0,0,0)';
      let inner = el.getElementsByClassName('inner-hook')[0];
      inner.style.webkitTransform = 'translate3d(0,0,0)';
      inner.style.transform = 'translate3d(0,0,0)';
    })
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    }
  },
  components: {
    carCount
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/subject.scss"></style>
