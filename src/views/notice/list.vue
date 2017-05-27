<template>

<div class="view fullPosition">

  <div class="wrap">
    <article class="main">
      <ul class="noticeList">
        <li v-for="list in 10">
          <router-link :to="{path:'/noticeList/noticeDetails',query: { projectId:projectId }}">
            <h2>小区停水通知</h2>
            <div class="bottom">
              <span class="time">2017年05月16日</span>
              <span class="num">阅读7</span>
            </div>
          </router-link>
        </li>
      </ul>
    </article>
  </div>

  <transition name="SlideRightLeft">
    <router-view></router-view>
  </transition>

</div>

</template>
<script>
import simplestorage from 'simplestorage.js'

export default {
  name: 'noticeList',
  data() {
    return{
      projectId:simplestorage.get('projectId')
    }
  },
  mounted() {

  },
  methods: {

  },
  components: {

  }
}
</script>
<style  lang="scss" src="../../assets/styles/notice.scss"></style>
