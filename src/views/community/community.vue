<style scoped>

  .boll{position:absolute;border-radius:50px;width:50px;height:50px;background:red;}
  #target{position:absolute;left:100px;top:300px;width: 50px;height: 50px;background: #f00;}

</style>
<template>

  <div class="wrap">
    <article class="main">

      社区
      <div @click="toLink()">跳转</div>
      <!--<div @click="del()">删除</div>-->
      <!--<div @click="add()">add</div>-->
<!---->
<!---->
      <!--<div id="boll" class="boll"></div>-->
    </article>
    <footer>
      <!-- 父级不能position:relative; -->
      <!--<div id="target">footer</div>-->
    </footer>
  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import {opModal} from '../../plugins/common'
import $ from 'jquery'
import {Parabola} from '../../plugins/parabola'

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

//    console.log(new Parabola())

    console.log(propertyAuth)

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

    },
    add:function(){

      var bool = new Parabola({
        el: "#boll"
      });

      bool.setOptions({
        targetEl: $("#target"),
        curvature: 0.002,
        duration: 1000
      });
      bool.start();

    }
  },
  components: {

  }
}
</script>
<style></style>
