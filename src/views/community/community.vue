<template>

  <div>
    社区
    <div @click="toLink()">跳转</div>
    <div @click="del()">删除</div>
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
//    opModal.toast({
//      txt:'提示',
//      time:999
//    })
//
//
//    setTimeout(function(){
//      opModal.toast({
//        del:true
//      })
//    },3000)

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
      return false;

    },
    del:function(){

    }
  },
  components: {

  }
}
</script>
<style></style>
