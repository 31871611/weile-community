<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll sale" v-if="!isData">
        <ul class="">
          <li v-for="(list,index) in lists">
            <router-link class="photo" :to="{path:'commodity',query: { id: list.goodsId }}">
              <img :src="list.imageUrl" alt="">
              <div class="box">
                <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.goodsName}}</h3>
                <div class="price">
                  <b>抢购价￥</b><strong>{{list.price / 1000 | price}}元</strong><span>￥{{list.originalPrice / 1000 | price}}</span>
                </div>
                <div class="bottom">
                  <div class="time" data-startTime="list.startTime" >
                    距结束：<div>{{list.time}}</div>
                  </div>
                  <!-- 当时时间 > 开始时间.抢购未开始 -->
                  <div class="go" v-if="list.sysTime > list.startTime && list.inventory > 0">马上抢</div>
                  <div class="go select" v-if="list.inventory <= 0">抢光了</div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <not-data v-if="isData"></not-data>

      <loading ref="loading" :txt="'加载中'" :icon="'loading'" :time="0"></loading>

    </article>
  </div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import notData from '../common/notData.vue';
import loading from '../common/modalToast.vue';

let timer = [];

export default {
  name: 'sale',
  data() {
    return{
      lists:'',
      isData:false
    }
  },
  mounted() {
    let _this = this;
    _this.$refs.loading.is = true;
    // 获取数据列表
    this.$http.post('/community/getFlashSaleGoodsList', {
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      'pageIndex':1,
      'pageSize':5
    },{
      "encryptType":1
    }).then(function(res){
      //console.log(res);
      if(res.resultCode != 0){
        alert(res.msg);
        return false;
      }
      // 显示加载中
      _this.$refs.loading.is = false;
      _this.lists = res.data.flashSaleGoodsList;
      // 无数据
      if(_this.lists.length <= 0){
        _this.isData = true;
        return false;
      }
      for(var i = 0;i < _this.lists.length;i++){
        _this.timer(i,_this.lists[i]);
      }
    }).catch(function(error) {
      console.log(error)
    })
  },
  beforeDestroy:function(){
    // 清除倒记时定时器
    for(let i = 0;i < timer.length;i++){
      clearInterval(timer[i]);
    }

  },
  methods: {
    timer:function(index,data){
      let _this = this;

      timer[index] = setInterval(function(){
        // 现在时间大于活动结束时间
        //console.log(data.startTime + '|' + data.endTime);
        if(data.startTime > data.endTime){
          console.log('活动已结束！');
          return false;
        }
        // 剩余时间.结束时间-现在时间
        let surplus = data.endTime - data.sysTime;
        // 系统时间加一秒
        data.sysTime = data.sysTime + 1000;
        // 剩余时间小于等于0
        if(surplus<=0){
          clearTimeout(timer[index]);
          console.log('活动已结束！');
          return false;
        }
        //console.log('剩余：'+surplus);

        let ds = 60*60*24*1000,
          d = parseInt(surplus/ds),
          h = parseInt((surplus-d*ds)/(60*60*1000)),
          m = parseInt((surplus - d*ds - h*3600*1000)/(60*1000)),
          s = parseInt((surplus-d*ds-h*3600*1000-m*60*1000)/1000);
        //console.log(d + '天' + h + '小时' + m + '分' + s + '秒');
        if(h < 10) h = '0' + h;
        if(m < 10) m = '0' + m;
        if(s < 10) s = '0' + s;

        Vue.set(_this.lists[index],'time',d+'天'+h+':'+m+':'+s);

      },1000);

    }
  },
  components: {
    notData,
    loading
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/sale.scss"></style>
