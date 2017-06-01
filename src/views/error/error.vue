<template>
  <div class="error">
    请在微信中打开
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

