<template>

  <div class="wrap fullPosition">

    <article class="main">
      <div class="mainScroll userAddAddress">
        <div class="import">
          <label for="">收货人</label>
          <input type="text" placeholder="请输入收货人姓名" v-model="name" />
        </div>
        <div class="import">
          <label for="">手机号</label>
          <input type="tel" placeholder="请输入收货人手机号码" v-model="mobile" />
        </div>
        <div class="selectAddress" @click="goSelectQuarters">
          <label for="">小区名称</label>
          <span>{{distributionCommunityName}}</span>
          <i></i>
        </div>

        <div class="detailedAddress">
          <label for="">详细地址</label>
          <textarea placeholder="补充详细地址" v-model="address"></textarea>
        </div>

        <div class="setDefault" @click="setDefault">
          <label for="">
            <span>设置此小区为默认地址</span>
            <i class="radio" :class="{'select':isDefault}"></i>
          </label>
        </div>


        <transition name="SlideRightLeft">
          <ul class="userSelectAddress" v-show="isSelectQuarters">
            <li class="select" v-for="(list,index) in quartersLists">
              <label @click="selectCurrentQuarters(list.name,list.id)">
                <i class="map"></i>
                <span>{{list.name}}</span>
                <i class="radio" :class="{'select':distributionCommunityId == list.id}"></i>
              </label>
            </li>
          </ul>
        </transition>


        <modal-toast ref="modalToast" :txt="'加载中'" :icon="'loading'" :time="0"></modal-toast>

      </div>
    </article>

    <footer>
      <div class="userAddAddressBtn">
        <span @click="save()">保存地址</span>
      </div>
    </footer>

  </div>

</template>
<script>
import simplestorage from 'simplestorage.js'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'userAddAddress',
  props:['list'],
  data() {
    return{
      path:this.$route.path,      //当前url，分:新增、修改
      addressId:'',               //修改地址时使用
      name:'',                    //必
      mobile:'',                  //必
      distributionCommunityName:simplestorage.get('HLXK_DISTRIBUTION').name || '选择小区',
      distributionCommunityId:simplestorage.get('HLXK_DISTRIBUTION').id || '',
      address:'',                 //必
      isDefault:false,            //"1"表示是 “0”不设为默认地址
      isSelectQuarters:false,     //选择小区弹窗
      quartersLists:''            //小区列表
    }
  },
  created() {

  },
  mounted() {
    let _this = this;

    if(this.path == '/userAddress/modify'){
      if(!_this.list){
        _this.$router.back();
        return false;
      }
      // 将数据传递到修改页面
      let data = _this.list[this.$route.query.index];
      //console.log(data);
      _this.distributionCommunityId = this.$route.query.communityId;
      _this.name = data.name;
      _this.mobile = data.mobile;
      _this.address = data.address;
      _this.isDefault = data.defaultAddress;

    }
  },
  methods: {
    // 设置默认
    setDefault:function(){
      this.isDefault = !this.isDefault;
    },
    // 是否显示小区列表
    goSelectQuarters:function(){
      let _this = this;
      _this.isSelectQuarters = true;
      // 获取小区列表
      this.$http.post('/community/getDistributionCommunityList', {
      },{
        "encryptType":1
      }).then(function(res){
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.quartersLists = res.data;
        //console.log(res.data);
      }).catch(function(error) {
        console.log(error)
      });

    },
    // 选择小区
    selectCurrentQuarters:function(name,id){
      this.distributionCommunityId = id;
      this.distributionCommunityName = name;
      this.isSelectQuarters = false;
    },
    // 新增地址
    add:function(){
      let _this = this;
      // 默认地址
      _this.isDefault ? _this.isDefault = 1 : _this.isDefault = 0;
      // 提交数据
      this.$http.post('/community/addReceiptAddress', {
        'name':_this.name,
        'mobile':_this.mobile,
        "distributionCommunityId": _this.distributionCommunityId,
        'address':_this.address,
        'isDefault':_this.isDefault
      },{
        "encryptType":1
      }).then(function(res){
        console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.$refs.modalToast.is = false;
        _this.$router.back();
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 修改地址
    modify:function(){
      let _this = this;
      // 默认地址
      _this.isDefault ? _this.isDefault = 1 : _this.isDefault = 0;
      // 修改地址数据
      this.$http.post('/community/modifyReceiptAddress', {
        'addressId':this.$route.query.addressId,
        'name':_this.name,
        'mobile':_this.mobile,
        "distributionCommunityId": _this.distributionCommunityId,
        'address':_this.address,
        'isDefault':_this.isDefault
      },{
        "encryptType":1
      }).then(function(res){
        //console.log(res);
        if(res.resultCode != 0){
          alert(res.msg);
          return false;
        }
        _this.$refs.modalToast.is = false;
        _this.$router.back();
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 地址提交
    save:function(){
      let _this = this;
      // 验证


      // 显示加载中
      _this.$refs.modalToast.is = true;
      // 提交
      if(this.path == '/userAddress/modify'){
        // 修改地址
        _this.modify();
      }else if(this.path == '/userAddress/add'){
        // 增加地址
        _this.add();
      }

    }
  },
  components: {
    modalToast
  }
}
</script>
<style scoped lang="scss" src="../../assets/styles/userAddAddress.scss"></style>
