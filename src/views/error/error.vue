<template>
  <div class="error">
    错误了
  </div>
</template>
<script>
import simplestorage from 'simplestorage.js'

export default {
  //name: 'success',
  data() {
    return{
      projectId:simplestorage.get('projectId')
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

