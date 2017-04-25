<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll couponDetails">

        <ul class="userCouponList">
          <li>
            <a href="">
              <div class="left">
                <strong class="Price"><b>￥</b>100</strong>
                <span class="txt">订单满100元</span>
                <span class="txt">(不含运费)可用</span>
              </div>
              <div class="right">
                <h3>指定商品使用</h3>
                <em>2016.01.01-2016.12.31</em>
                <!--可用券-->
                <i class="steVoucher"></i>
              </div>
            </a>
          </li>
        </ul>

        <div class="not">
          当前没有适用商品
        </div>

        <div class="title">
          <h2>查看适用商品</h2>
          <i></i>
        </div>


        <div class="title">
          <h2>适用商品</h2>
        </div>
        <ul class="goods">
          <li>
            <a href="">
              <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
              <p>超新鲜青柠檬</p>
            </a>
          </li>
          <li>
            <a href="">
              <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
              <p>超新鲜青柠檬</p>
            </a>
          </li>
          <li>
            <a href="">
              <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
              <p>超新鲜青柠檬超新鲜青柠檬</p>
            </a>
          </li>
        </ul>

        <div class="applyCategory">
          <ul>
            <li>分类分类1</li>
            <li>分类分类1</li>
            <li>分类分类1</li>
            <li>分类分类1</li>
            <li>分类分类1</li>
          </ul>
        </div>

        <div class="title">
          <h2>使用说明</h2>
        </div>
        <div class="illustrate">
          <p>超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬</p>
          <p>超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬超新鲜青柠檬</p>
        </div>


      </div>

    </article>

  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'

export default {
  name: 'couponDetails',
  data() {
    return{

    }
  },
  mounted() {
    let _this = this;
    // 显示加载中
    //_this.$refs.modalLoading.is = true;
    // 获取数据列表
    this.$http.post('/community/getMyStoreCouponList', {
      "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id,
      "couponId":this.$route.query.id
    },{
      "encryptType":1
    }).then(function(res){
      console.log(res);
      if(res.resultCode != 0){
        alert(res.msg);
        return false;
      }

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
<style scoped lang="scss" src="../../assets/styles/couponDetails.scss"></style>
