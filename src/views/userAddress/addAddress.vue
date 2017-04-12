<template>

  <div class="wrap">

    <article class="main">
      <div class="mainScroll userAddAddress">
        <div class="import">
          <input type="text" placeholder="请输入收货人姓名" />
        </div>
        <div class="import">
          <input type="tel" placeholder="请输入收货人手机号码" />
        </div>
        <div class="selectAddress">
          <span>选择小区</span>
          <i></i>
        </div>

        <div class="detailedAddress" contenteditable="true">
          详细地址
        </div>

        <div class="setDefault">
          <label for="setDefault">
            <span>设为默认地址</span>
            <input id="setDefault" type="radio" name="setDefault" />
          </label>
        </div>

        <ul class="userSelectAddress">
          <li class="select">
            <label>
              <i></i>
              <span>橘园创意广场</span>
              <input type="radio" />
            </label>
          </li>
          <li class="select">
            <label>
              <i></i>
              <span>橘园创意广场</span>
              <input type="radio" />
            </label>
          </li>
        </ul>

      </div>
    </article>

    <footer>
      <div class="userAddAddressBtn">
        <span>提交</span>
      </div>
    </footer>

  </div>

</template>
<script>

export default {
  name: 'userAddAddress'
}
</script>
<style scoped lang="scss" src="../../assets/styles/userAddAddress.scss"></style>
