<template>

  <div class="wrap">

    <article class="main">
      <div class="mainScroll shoppingCart">
        <div class="shoppingTitle">
          <h3>锦艺便利</h3>
          <span>编辑</span>
        </div>
        <div class="explain">
          <span>满减</span>
          <p>编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑</p>
        </div>

        <ul class="shoppingList">
          <li>
            <input id="a1" type="radio" />
            <a href="" class="photo">
              <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
              <i class="activity">活动</i>
              <i class="goIng">抢购中</i>
              <span>库存不足</span>
            </a>
            <div class="box">
              <h3>标题标题标题标题标题标题</h3>
              <div class="bottom">
                <strong class="price">200<b>元/件</b></strong>
                <span class="limit">限购5件</span>
                <div class="selectNum">
                  <div class="reduce"></div>
                  <input type="text" value="1" />
                  <div class="add"></div>
                </div>
              </div>
            </div>
          </li>

        </ul>


        <div class="explain">
          <span>满折</span>
          <p>编辑编辑编辑编辑辑编辑编辑编辑</p>
        </div>
        <ul class="shoppingList">
          <li>
            <input id="a2" type="radio" />
            <a href="" class="photo">
              <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
              <i class="activity">活动</i>
              <i class="goIng">抢购中</i>
              <span>库存不足</span>
            </a>
            <div class="box">
              <h3>标题标题标题标题标题标题</h3>
              <div class="bottom">
                <strong class="price">200<b>元/件</b></strong>
                <span class="limit">限购5件</span>
                <div class="selectNum">
                  <div class="reduce"></div>
                  <input type="text" value="1" />
                  <div class="add"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>

      </div>
    </article>
    <footer>
      <div class="footerInfo">
        差1.00元免配送费
      </div>
      <div class="footerCart">
        <div class="box">
          <input id="all" type="radio" />
          <label for="all">全选</label>
          <div class="total">
            <span>合计：<b>￥200.00</b></span>
            <em>已优惠￥50</em>
          </div>
        </div>
        <div class="next del">去结算</div>
      </div>
      <div class="appNav">
        <router-link to="home" class="home">首页</router-link>
        <router-link to="community" class="community">社区</router-link>
        <router-link to="store" class="convenient">便利店</router-link>
        <router-link to="shopping" class="shopping">购物车</router-link>
        <router-link to="user" class="my">我的</router-link>
      </div>
    </footer>
  </div>

</template>
<script>

export default {
  name: 'shopping'
}
</script>
<style scoped lang="scss" src="../../assets/styles/shopping.scss"></style>
