<template>

  <div>
    社区
    <div @click="toLink()">跳转</div>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import {opModal} from '../../plugins/common'

export default {
  name: 'community',
  data() {
    return{

    }
  },
  mounted() {
/*

    // openid没有失效时间，一个微信对应不同的公众号有不同的openid的

*/

//    opModal.alert({
//      content:"此商品只有该小区住户才能购买",
//      ok:"验证",
//      onOk:function(){
//        _this.$router.push({
//          path: '/login',
//          projectId:simplestorage.get('projectId')
//        })
//      },
//      cancel:'放弃',
//      onCancel:function(){
//
//      }
//    })


  },
  methods: {
    // 跳转到外部url
    toLink:function(){
      //location.href = "http://zzh.yidinghuo.net/api/pub/wechatAuth?redirect_uri="+ encodeURIComponent(location.href) +"&scope=snsapi_base&appId=wx7953a1343c2f2082";


      opModal.alert({
//      title:'这是标题',
        content:"这是内容",
        ok:"去百度",
        onOk:function(){
          location.href = "http://www.baidu.com";
        },
        cancel:'取消',
        onCancel:function(){

        }
      })

    }
  },
  components: {

  }
}
</script>
<style></style>
