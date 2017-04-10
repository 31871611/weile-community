<template>

  <div class="wrap">
    <header>
      111
    </header>
    <article class="main">
      <div class="content">
        <div class="scrollY">
          <ul class="classifyList">
            <li>所有商品</li>
            <li class="select">生鲜蔬菜</li>
            <li>进口零售</li>
            <li>蛋糕饼干</li>
            <li v-for="list in 10">坚果炒货</li>
          </ul>
        </div>

        <div class="scrollY">
          <ul class="contentList">
            <li>
              <a href="" class="photo">
                <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
                <i class="activity">活动</i>
                <i class="goIng">抢购中</i>
              </a>
              <div class="box">
                <h3>标题标题标题标题标题标题</h3>
                <div class="bottom">
                  <strong class="price">200<b>元/件</b></strong>
                  <div class="selectNum">
                    <div class="reduce"></div>
                    <input type="text" value="1" />
                    <div class="add"></div>
                  </div>
                  <div class="go">马上抢</div>
                </div>
              </div>
            </li>


            <li>
              <a href="" class="photo">
                <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
                <i class="activity">活动</i>
              </a>
              <div class="box">
                <h3>标题标题标题标题标题标题</h3>
                <div class="bottom">
                  <strong class="price">200<b>元/件</b></strong>
                  <div class="selectNum">
                    <div class="reduce"></div>
                    <input type="text" value="1" />
                    <div class="add"></div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href="" class="photo">
                <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
                <i class="goIng">抢购中</i>
              </a>
              <div class="box">
                <h3>标题标题标题标题标题标题</h3>
                <div class="bottom">
                  <strong class="price">200<b>元/件</b></strong>
                  <div class="go">马上抢</div>
                </div>
              </div>
            </li>
            <li v-for="list in 10">
              <a href="" class="photo">
                <img src="http://img.v89.com/group1/M06/07/88/rBAA11gElhiAEy6lAACUY9hK_T0535_353*353_220x220.jpg" alt="">
                <i class="activity">活动</i>
                <i class="goIng">抢购中</i>
              </a>
              <div class="box">
                <h3>标题标题标题标题标题标题</h3>
                <div class="bottom">
                  <strong class="price">200<b>元/件</b></strong>
                  <div class="selectNum">
                    <div class="reduce"></div>
                    <input type="text" value="1" />
                    <div class="add"></div>
                  </div>
                  <div class="go">马上抢</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>



</template>
<script>

export default {
  name: 'list'
}
</script>
<style scoped lang="scss" src="../../assets/styles/list.scss"></style>
