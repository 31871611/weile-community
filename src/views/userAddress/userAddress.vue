<template>
<div class="view fullPosition">

  <div class="wrap">

    <article class="main">
      <div class="mainScroll userAddress">
        <div class="title" v-if="canDeliverAddressInfos.length > 0">
          可配送地址
        </div>

        <ul v-if="canDeliverAddressInfos.length > 0">
          <li v-for="(list,index) in canDeliverAddressInfos">

            <a v-if="source == 'payorder'" href="javascript:;" @click="selectAddress(list)">
              <div><span class="name">{{list.name}}</span><span class="tel">{{list.mobile}}</span></div>
              <p>{{list.communityName}} | {{list.address}}</p>
              <i class="auth" v-if="list.isAuthenAddress"></i>
            </a>
            <router-link v-else :to="{path:'/userAddress/modify',query: { index: index,communityId: list.communityId,addressId:list.addressId }}">
              <div><span class="name">{{list.name}}</span><span class="tel">{{list.mobile}}</span></div>
              <p>{{list.communityName}} | {{list.address}}</p>
              <i class="auth" v-if="list.isAuthenAddress"></i>
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
              <i class="auth" v-if="list.isAuthenAddress"></i>
            </a>
          </li>
        </ul>
      </div>

    </article>
    <footer>
      <div class="userAddressBtn">
        <router-link to="address/add" v-if="source == 'payorder'">
          新增地址
        </router-link>
        <router-link to="userAddress/add" v-else>
          新增地址
        </router-link>
      </div>
    </footer>
  </div>

  <transition name="SlideRightLeft">
    <router-view :list="canDeliverAddressInfos"></router-view>
  </transition>

  <modal-toast ref="modalToast"></modal-toast>

</div>
</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import notData from '../common/notData.vue'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'userAddress',
  props:['goodsInfo'],
  data() {
    return{
      parentPath:'',                              // url参数
      canDeliverAddressInfos:'',                  // 可配送地址
      noDeliverAddressInfos:'',                   // 不可配送地址
      parentUrl:'',                               // 上一级url，结算、用户中心
      source:this.$route.query.source || ''       // 来源.从结算过来
    }
  },
  mounted() {

    this.init();

  },
  methods: {
    init(){
      let _this = this;
      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });
      this.$http.post('/community/getStoreDeliveryAddress', {
        "distributionCommunityId": simplestorage.get('HLXK_DISTRIBUTION').id
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(JSON.stringify(res.data));
        if(res.resultCode != 0){
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
          return false;
        }
        _this.canDeliverAddressInfos = res.data.canDeliverAddressInfos;
        _this.noDeliverAddressInfos = res.data.noDeliverAddressInfos;
        // 隐藏加载中
        _this.$refs.modalToast.is = false;
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 只选择地址不修改
    selectAddress:function(list){
      let _this = this;
      //alert('选择地址');
      _this.$router.push({
        path: '/payorder',
        query:{
          'goodsInfo':_this.goodsInfo,
          'address':JSON.stringify(list)
        }
      });
    }
  },
  components: {
    notData,
    modalToast
  },
  watch: {
    '$route' () {
      //if(this.$route.query.reload == '1'){
        this.init();
      //}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.parentPath = from.fullPath;
    })
  },
//  beforeRouteUpdate(to, from, next){
//    console.log(to);
//    console.log(from);
//    next();
//  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userAddress.scss"></style>
