<template>

  <div>
    社区
    <div @click="toLink()">跳转</div>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'

export default {
  name: 'community',
  data() {
    return{

    }
  },
  mounted() {
/*
    //

    // openid没有失效时间，一个微信对应不同的公众号有不同的openid的

    // 开发
    //console.log(process.env.NODE_ENV == "development");

encodeURIComponent(location.href)

 http://172.16.12.177:9999/#/community?userInfo=%7B%22access_token%22%3A%22nEEQ7yjm5B1AlqxwpCx6i3WFuwHnGTxeutMngMoRtjkD4CL36igbfCq11I2uDebFUAmtBXpnhK0ZYidhRpisPzja39vKTLCNxMFLsgdRHp4%22,%22expires_in%22%3A7200,%22refresh_token%22%3A%22G2-OR_EGf2w9fQpoxmV3Q-uLIKYHtAoJElXtRx0dHnMLlPQ2MzMzR376FQJT1p1EZQ6UzG2uSJeUIyht262wSbFLpmll8K3EMd9zoHtzApU%22,%22openid%22%3A%22oguZ0t5CPc76PXM_ggdlzm7koS-0%22,%22scope%22%3A%22snsapi_base%22,%22unionid%22%3A%22oxPGgwgHJRJ9r2H8VDeMXP4eFJDk%22%7D


*/



  },
  methods: {
    // 跳转到外部url
    toLink:function(){
      location.href = "http://zzh.yidinghuo.net/api/pub/wechatAuth?redirect_uri="+ encodeURIComponent(location.href) +"&scope=snsapi_base&appId=wx7953a1343c2f2082";
    }
  },
  components: {

  }
}
</script>
<style></style>
