<template>
<div>

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


  <div class="appNav">
    <router-link to="/" class="home" :class="{select : selectClass == 'home'}">首页</router-link>
    <router-link to="community" class="community" :class="{select : selectClass == 'community'}">社区</router-link>
    <router-link to="store" class="convenient" :class="{select : selectClass == 'store'}">便利店</router-link>
    <router-link to="shopping" class="shopping" :class="{select : selectClass == 'shopping'}">
      购物车<b v-if="shoppingNum > 0">{{shoppingNum}}</b>
    </router-link>
    <router-link to="userHome" class="my" :class="{select : selectClass == 'userHome'}">我的</router-link>
  </div>

</div>
</template>
<script>
import simplestorage from 'simplestorage.js'
//import Bus from '../../plugins/bus'
import cart from '../../plugins/cart'

export default {
  //name: 'appNav',
  props:{
    selectClass:{
      type:String
    }
  },
  data() {
    return{
      shoppingNum:0,
      balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
      dropBalls: []
    }
  },
  created: function() {

  },
  mounted() {

      // 购物车数量
      this.getCartGoodsNum();

  },
  methods: {
    // 购物车数量
    getCartGoodsNum:function(){
      let _this = this;

      // 是否登录.获取购物车数量
      if(simplestorage.get('HLXK_STATUS')){
        // 获取购物车数量...每次加载本组件就
        this.$http.post('/community/getCartGoodsNum', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
        },{
          "encryptType":1
        }).then(function(res) {
          //console.log(res)
          if (res.resultCode != 0) {
            alert(res.msg);
            return false;
          }
          _this.shoppingNum = res.data.cartGoodsNum;
        }).catch(function(error) {
          console.log(error)
        })
      }else{
        //获取缓存购物车商品信息
        _this.shoppingNum = cart.getAmount();
      }

      console.log('购物车数量：' + _this.shoppingNum)

    },
    // 跳转到外部url
    toLink:function(url){
      location.href = url;
    },
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

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/_appNav.scss"></style>
