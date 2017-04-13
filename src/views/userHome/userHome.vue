<template>

  <div class="wrap">

    <article class="main">
      <div class="mainScroll userHome">
        <div class="bg">
          <div class="center">
            <div class="face">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492062648544&di=b885e712d6151036468cf73bf2276428&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-09-13%2F233023400.jpg" alt="">
            </div>
            <span>用户名</span>
          </div>
        </div>
        <div class="address">
          <i class="map"></i>
          <div>
            <strong>福州 融侨锦江</strong>
            <span>005座003单元012房</span>
          </div>
          <i class="arrowR"></i>
        </div>
        <ul class="list">
          <li>
            <div>
              <img :src="'./static/images/icon_menu_community_p@2x.png'" alt="">
              <span>我的话题</span>
            </div>
          </li>
          <li>
            <div>
              <img :src="'./static/images/icon_menu_community_p@2x.png'" alt="">
              <span>我的活动</span>
            </div>
          </li>
          <li>
            <div>
              <img :src="'./static/images/icon_menu_community_p@2x.png'" alt="">
              <span>我的报修</span>
            </div>
          </li>
          <li>
            <div>
              <img :src="'./static/images/icon_menu_community_p@2x.png'" alt="">
              <span>我的投诉</span>
            </div>
          </li>
          <li>
            <div>
              <img :src="'./static/images/icon_menu_community_p@2x.png'" alt="">
              <span>我的硬件</span>
            </div>
          </li>
        </ul>
      </div>
    </article>

  </div>

</template>
<script>

export default {
  name: 'userHome'
}
</script>
<style scoped lang="scss" src="../../assets/styles/userHome.scss"></style>
