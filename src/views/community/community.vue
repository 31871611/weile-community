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
      <div @click="add()">add</div>
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
import flyer from '../../plugins/jquery.fly.min'

export default {
  name: 'community',
  data() {
    return{
      sel:[]
    }
  },
  mounted() {

//    opModal.toast({
//      icon:'loading',
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



    console.log(this.$router.currentRoute.fullPath)


    this.$http.post('/community/checkVerificationCode', {
      "projectId":simplestorage.get('projectId')
    }).then(function (res) {
      console.log(res)
    }).catch(function (error) {
      console.log(error)
    })


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

      var flyer = $('<img class="u-flyer" src="http://scimg.jb51.net/allimg/150614/14-1506141Z0470-L.jpg">');			// 飞入效果
      flyer.fly({
        start: {
          left: 0,			//开始位置（必填）#fly元素会被设置成position: fixed
          top: 0			//开始位置（必填）
        },
        end: {
          left: 300,		//结束位置（必填）
          top: 300,			//结束位置（必填）
          width: 0,					//结束时宽度
          height: 0					//结束时高度
        },
        onEnd: function(){				//结束回调
          alert(1);
          this.destory();		//移除dom
        }
      });

    }
  },
  components: {

  }
}
</script>
<style></style>
