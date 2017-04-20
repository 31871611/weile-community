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
                <i class="goIng" v-if="list.isFlashSale == 1">抢购中</i>
                <router-link :to="{path:'commodity',query: { id: list.commodityId }}" class="photo">
                  <img :src="list.url" alt="">
                </router-link>
                <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                <div class="bottom">
                  <div class="price">
                    <b>￥</b>
                    <strong v-if="list.isFlashSale != 1">{{list.priceYuan | price}}</strong>
                    <strong v-if="list.isFlashSale == 1">{{list.flashSalePrice | price}}</strong>
                  </div>
                  <div class="go" v-if="list.isFlashSale == 1">
                    马上抢
                  </div>
                  <div class="num" v-if="list.isFlashSale != 1">
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>


        <div class="mostFooter">
          <span>已经到最底了</span>
        </div>
      </div>

      <div class="floatShopping">
        <b>30</b>
      </div>

    </article>
    <footer>
      <div class="footerCart">
        <div class="total">
          合计：<b>￥0.00</b><em>(已选0件)</em>
        </div>
        <div class="next">下一步</div>
      </div>
    </footer>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'

export default {
  name: 'subject',
  data() {
    return{
      lists:''
    }
  },
  mounted() {
    let _this = this;
    // 获取数据列表
    this.$http.post('/community/getThematicCommodityPage', {
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      'thematicId':this.$route.query.id,
      'pageIndex':1,
      'pageSize':5
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
  methods: {

  },
  components: {

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/subject.scss"></style>
