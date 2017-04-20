<template>

  <div class="notData">
    <div class="box">
      <i></i>
      <span>{{txt}}</span>
    </div>
  </div>

</template>
<script>

export default {
  props:{
    txt:{
      type:String,
      default:'当前没有数据哦~'
    }
  },
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
<style scoped lang="scss" src="../../assets/styles/_notData.scss"></style>
