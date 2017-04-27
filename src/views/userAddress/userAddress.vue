<template>
<div class="view">

  <div class="wrap">

    <article class="main">
      <div class="mainScroll userAddress">
        <div class="title" v-if="canDeliverAddressInfos.length > 0">
          可配送地址
        </div>
        <ul v-if="canDeliverAddressInfos.length > 0">
          <li v-for="(list,index) in canDeliverAddressInfos">
            <router-link :to="{path:'/userAddress/modify',query: { index: index,communityId: list.communityId,addressId:list.addressId }}">
              <div><span class="name">{{list.name}}</span><span class="tel">{{list.mobile}}</span></div>
              <p>{{list.communityName}} | {{list.address}}</p>
              <i v-if="list.isAuthenAddress"></i>
            </router-link>
          </li>
        </ul>
        <div class="title" v-if="noDeliverAddressInfos.length > 0">
          不可配送地址
        </div>
        <ul v-if="noDeliverAddressInfos.length > 0">
          <li class="select" v-for="(list,index) in noDeliverAddressInfos">
            <a href="javascript:;">
              <div><span class="name">{{list.name}}</span><span class="tel">{{list.mobile}}</span></div>
              <p>{{list.communityName}} | {{list.address}}</p>
              <i v-if="list.isAuthenAddress"></i>
            </a>
          </li>
        </ul>
      </div>

    </article>
    <footer>
      <div class="userAddressBtn">
        <router-link to="/userAddress/add">
          新增地址
        </router-link>
      </div>
    </footer>
  </div>

  <transition name="SlideRightLeft">
    <router-view :list="canDeliverAddressInfos"></router-view>
  </transition>

  <modal-toast ref="modalToast" :txt="'加载中'" :icon="'loading'" :time="0"></modal-toast>

</div>
</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import notData from '../common/notData.vue'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'userAddress',
  data() {
    return{
      canDeliverAddressInfos:'',
      noDeliverAddressInfos:''
    }
  },
  mounted() {

    this.init();

  },
  methods: {
    init(){
      let _this = this;
      // 显示加载中
      _this.$refs.modalToast.is = true;
      this.$http.post('/community/getStoreDeliveryAddress', {
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(JSON.stringify(res.data));
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.canDeliverAddressInfos = res.data.canDeliverAddressInfos;
        _this.noDeliverAddressInfos = res.data.noDeliverAddressInfos;
        // 隐藏加载中
        _this.$refs.modalToast.is = false;
      }).catch(function(error) {
        console.log(error)
      })
    }
  },
  components: {
    notData,
    modalToast
  },
  beforeRouteUpdate(to, from, next){
    // 进入下一连接=改变会运行，to.name == 'userAddress'只在返回时运行
    if(to.name == 'userAddress'){
      this.init();
    }
    next();
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userAddress.scss"></style>
