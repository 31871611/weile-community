<template>

  <div class="wrap">

    <article class="main">
      <div class="mainScroll userApplyBack">
        <div class="info">
          <span>退款金额收到商品破损</span>
          <strong>￥10.00</strong>
        </div>

        <div class="info">
          <span>原路退回</span>
          <em>(3-10个工作日退回原帐号)</em>
        </div>

        <div class="title">
          选择取消原因
        </div>
        <ul class="selectExitList">
          <li>
            <label for="exit1">
              <span>收到商品破损</span>
              <input id="exit1" type="radio" value="收到商品破损" v-model="txt" />
            </label>
          </li>
          <li>
            <label for="exit2">
              <span>商品错发/漏发</span>
              <input id="exit2" type="radio" value="商品错发/漏发" v-model="txt" />
            </label>
          </li>
          <li>
            <label for="exit3">
              <span>收到商品怀描述不符</span>
              <input id="exit3" type="radio" value="收到商品怀描述不符" v-model="txt" />
            </label>
          </li>
          <li>
            <label for="exit4">
              <span>我不想要了</span>
              <input id="exit4" type="radio" value="我不想要了" v-model="txt" />
            </label>
          </li>
          <li>
            <label for="exit5">
              <span>商品质量问题</span>
              <input id="exit5" type="radio" value="商品质量问题" v-model="txt" />
            </label>
          </li>
          <li>
            <label for="exit6">
              <span>未收到货</span>
              <input id="exit6" type="radio" value="未收到货" v-model="txt" />
            </label>
          </li>
          <li>
            <label for="exit7">
              <span>其它</span>
              <input id="exit7" type="radio" value="其它" v-model="txt" />
            </label>
          </li>
        </ul>
      </div>
    </article>

    <footer>
      <div class="userApplyBackBtn">
        <span @click="submit">提交</span>
      </div>
    </footer>

  </div>

</template>
<script>

export default {
  name: 'userApplyBack',
  data() {
    return{
      id:this.$route.query.id,
      txt:''
    }
  },
  mounted() {

  },
  methods: {
    submit:function(){
      let _this = this;
      if(_this.id == ""){
        alert('不能为空');
        return false;
      }
      if(_this.txt == ""){
        alert('不能为空');
        return false;
      }

      //_this.$refs.modalLoading.is = true;
      this.$http.post('/community/cancelStoreOrder',{
        "orderId":_this.id,
        "cancelReason":_this.txt,   //申请退单原因
        "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":1
      }).then(function(res) {
        console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        // 判断团购
        //_this.list = res.data;
        // 隐藏加载中
        //_this.$refs.modalLoading.is = false;
        //console.log(JSON.stringify(_this.list));

      }).catch(function(error) {
        console.log(error)
      })

    }
  },
  components: {

  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userApplyBack.scss"></style>
