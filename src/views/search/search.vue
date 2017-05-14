<template>

  <div class="wrap">
    <header>
      <div class="search">
        <form class="box" id="searchForm" @submit.prevent="submit()">
          <i></i>
          <input type="search" id="search" @focus="searchFocus" @blur="searchBlur" placeholder="搜索" v-model="keyWord" autofocus />
        </form>
        <span class="exit" @click="exit" v-show="isExit">取消</span>
      </div>
    </header>
    <article class="main">

      <div class="mainScroll">

        <!-- 列表 -->
        <ul class="searchList" v-show="is">
          <li v-for="(list,index) in lists">
            <router-link class="photo" :to="{path:'commodity',query: { id: list.commodityId }}">
              <img :src="list.url" alt="">
              <div class="box">
                <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                <div class="bottom">

                  <strong class="price" v-if="list.isFlashSale == '' || list.flashSaleStatus == 0">{{list.price / 1000 | price}}<b>元/{{list.unit}}</b></strong>
                  <strong class="price" v-if="list.isFlashSale == 1">{{list.flashSalePrice / 1000 | price}}<b>元/{{list.unit}}</b></strong>

                  <div class="go" v-if="list.isFlashSale == 1">马上抢</div>

                  <car-count ref="carcount" @modifyShopCarCount="modifyShopCarCount" v-if="list.isFlashSale != 1 && list.inventory > 0" :type="false" :index="index" :is-house-user="list.isHouseUser" :commodity-id="list.commodityId" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                </div>
              </div>
            </router-link>
          </li>
        </ul>

        <!-- 搜索记录列表 -->
        <div class="searchRecord" v-show="isSearchRecord">
          <ul>
            <li v-for="list in searchRecord" @click="selectHistory(list.name)">
              <span>{{list.name}}</span>
              <i></i>
            </li>
          </ul>
          <div class="exit" @click="deleteHistory">清除搜索历史</div>
        </div>

        <!-- 无数据 -->
        <not-data v-show="isNotData"></not-data>

        <modal-toast ref="modalToast"></modal-toast>

      </div>

    </article>
  </div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import carCount from '../common/carCount.vue';
import notData from '../common/notData.vue'
import modalToast from '../common/modalToast.vue'

export default {
  name: 'search',
  data() {
    return{
      distributionCommunityId:simplestorage.get('HLXK_DISTRIBUTION').id,
      is:false,
      lists:'',
      searchRecord:'',            // 搜索记录
      isSearchRecord:false,
      keyWord:'',
      isNotData:false,
      isExit:false
    }
  },
  mounted() {

    this.queryHistory()

  },
  methods: {
    search:function(){
      let _this = this;

      if (!_this.keyWord) return;

      // 搜索
      this.$http.post('/community/getCommodityPage', {
        "distributionCommunityId":_this.distributionCommunityId,
        "pageIndex": 1,
        "pageSize": 10,
        "keyWord": _this.keyWord,
        "type":3            //查询类型：1：推荐 2：团购 3：普通
      },{
        "encryptType":1
      }).then(function(res) {
        console.log(res);
        if (res.resultCode != 0) {
          _this.$refs.modalToast.toast({
            txt:res.msg
          });
          return false;
        }
        _this.lists = res.data.data;
        //console.log(JSON.stringify(_this.lists))

        // 隐藏搜索历史
        _this.isSearchRecord = false;

        if(_this.lists.length > 0){
          // 显示列表数据
          _this.is = true;
          // 隐藏没数据提示
          _this.isNotData = false;
        }else{
          // 隐藏列表数据
          _this.is = false;
          // 显示没数据提示
          _this.isNotData = true;
        }

      }).catch(function(error) {
        console.log(error)
      })

    },
    submit:function(){
      this.addHistory();
      this.search();

    },
    // 取消搜索
    exit:function(){
      // 隐藏列表
      this.is = false;
      // 搜索历史不为空就显示
      if(this.searchRecord){
        this.isSearchRecord = true;
      }
    },
    // 得到焦点显示
    searchFocus:function(){
      this.isExit = true;
    },
    // 失去焦点隐藏
    searchBlur:function(){
      this.isExit = false;
    },
    // 从缓存里读取记录
    queryHistory:function(){
      this.searchRecord = simplestorage.get('_searchList') || '';
      // 搜索历史不为空就显示
      if(this.searchRecord){
        this.isSearchRecord = true;
      }
    },
    // 新增历史记录
    addHistory:function(){
      let _this = this;
      if (!_this.keyWord) return;
      var searchList = simplestorage.get('_searchList') || [];

//      searchList = $.grep(searchList, function(n, i){
//        return n.name !== _this.keyWord;
//      })

      if(searchList.length > 10) searchList.pop();
      searchList.unshift({
        id: new Date().getTime(),
        name: _this.keyWord
      });
      simplestorage.set('_searchList', searchList);
      //callback();

    },
    // 删除历史记录
    deleteHistory:function(){
      if(simplestorage.deleteKey('_searchList')){
        this.searchRecord = '';
        this.isSearchRecord = false;
      }
    },
    // 选择历史记录
    selectHistory:function(name){
      this.keyWord = name;
      this.submit();
    },
    /************************************************************************************************/
    // 修改列表中已添加购物车值
    modifyShopCarCount:function(type,list,index){
      let _this = this;
      if(type == 'add'){
        Vue.set(_this.lists[index],'shopCarCount',_this.lists[index]['shopCarCount'] + 1);
      }else if(type == 'del'){
        Vue.set(_this.lists[index],'shopCarCount',_this.lists[index]['shopCarCount'] - 1);
      }
    }

  },
  components: {
    carCount,
    notData,
    modalToast
  }
}
</script>
<style lang="scss" src="../../assets/styles/store.scss"></style>
