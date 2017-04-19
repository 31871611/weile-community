<template>

  <div class="wrap">
    <article class="main">
      <div class="mainScroll subject">
        <div class="adPhoto">
          <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
        </div>


        <div class="subjectList">

          <ul>
            <li>
              <div class="content">
                <i class="activity">活动</i>
                <i class="goIng">抢购中</i>
                <router-link :to="{path:'commodity/' + 10}" class="photo">
                  <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
                </router-link>
                <h3>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                <div class="bottom">
                  <div class="price">
                    <b>￥</b><strong>110</strong>
                  </div>
                  <div class="go">
                    马上抢
                  </div>
                  <div class="num">
                  </div>
                </div>
              </div>
            </li>

            <li v-for="list in 11">
              <div class="content">
                <i class="activity">活动</i>
                <i class="goIng">抢购中</i>
                <router-link :to="{path:'commodity/' + 10}" class="photo">
                  <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
                </router-link>
                <h3>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                <div class="bottom">
                  <div class="price">
                    <b>￥</b><strong>110</strong>
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

export default {
  name: 'subject'
}
</script>
<style scoped lang="scss" src="../../assets/styles/subject.scss"></style>
