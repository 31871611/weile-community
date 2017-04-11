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
            <li>所有商品</li>
            <li class="select">生鲜蔬菜</li>
            <li>进口零售</li>
            <li>蛋糕饼干</li>
            <li v-for="list in 10">坚果炒货</li>
          </ul>
        </div>

        <div class="contentList">
          <ul class="">
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
    <footer>
      <div class="footerCart">
        <div class="total">
          合计：<b>￥0.00</b><em>(已选0件)</em>
        </div>
        <div class="next">下一步</div>
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
  name: 'store'
}
</script>
<style scoped lang="scss" src="../../assets/styles/store.scss"></style>
