<template>
  <transition name="SlideRightLeft">
    <div class="wrap fullPosition">
      <header>
        <div class="header">
          <h2>选择小区</h2>
          <div class="left">
            <div class="back" @click="back()"></div>
          </div>
          <div class="right">

          </div>
        </div>
      </header>
      <article class="main">
        <div class="mainScroll selectQuarters">
          <ul>
            <li v-for="(list, index) in lists" @click="select(index)">{{list}}</li>
          </ul>
        </div>
      </article>
    </div>
  </transition>

</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      lists:['锦艺测试小区1','锦艺测试小区2','锦艺测试小区3','锦艺测试小区4','锦艺测试小区5','锦艺测试小区6']
    }
  },
  mounted() {
  },
  methods: {
    back:function(){
      this.$emit('back',false);
    },
    select:function(index){
      let txt = this.lists[index];
      alert(txt);
      this.$emit('select',txt);
      this.$emit('back',false);
    }
  }

}
</script>
<style scoped lang="scss" src="../../assets/styles/components/_indexSelectQuarters.scss"></style>
