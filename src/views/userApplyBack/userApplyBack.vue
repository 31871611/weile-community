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
              <input id="exit1" type="radio" name="exit" />
            </label>
          </li>
          <li>
            <label for="exit2">
              <span>商品错发/漏发</span>
              <input id="exit2" type="radio" name="exit" />
            </label>
          </li>
          <li>
            <label for="exit3">
              <span>收到商品怀描述不符</span>
              <input id="exit3" type="radio" name="exit" />
            </label>
          </li>
          <li>
            <label for="">
              <span>我不想要了</span>
              <input type="radio" name="exit" />
            </label>
          </li>
          <li>
            <label for="">
              <span>商品质量问题</span>
              <input type="radio" name="exit" />
            </label>
          </li>
          <li>
            <label for="">
              <span>未收到货</span>
              <input type="radio" name="exit" />
            </label>
          </li>
          <li>
            <label for="">
              <span>其它</span>
              <input type="radio" name="exit" />
            </label>
          </li>
        </ul>
      </div>
    </article>

    <footer>
      <div class="userApplyBackBtn">
        <span>提交</span>
      </div>
    </footer>

  </div>

</template>
<script>

export default {
  name: 'userApplyBack',
  data() {
    return{

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
<style scoped lang="scss" src="../../assets/styles/userApplyBack.scss"></style>
