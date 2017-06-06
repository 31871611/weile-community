<template>

  <div class="wrap">
    <header>
      <div class="search">
        <form class="box" id="searchForm" @submit.prevent="submit()">
          <i></i>
          <input type="search" id="search" @focus="searchFocus" placeholder="搜索" v-model="keyWord" autofocus />
        </form>
        <span class="exit" @click="exit" v-show="isExit">取消</span>
      </div>
    </header>
    <article class="main" ref="scrollContent">

      <!--<div class="mainScroll"></div>-->

        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoad" infinite-scroll-distance="10">
          <!-- 列表 -->
          <ul class="searchList" v-show="is">
            <li v-for="(list,index) in lists" v-bind:key="index">
              <router-link class="photo" :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}">
                <img :src="list.url" alt="">
              </router-link>
              <div class="box">
                <router-link :to="{path:'commodity',query: { id: list.commodityId,projectId:projectId }}">
                  <h3><b v-if="list.isHouseUser == 1">[住户专享]</b>{{list.name}}</h3>
                  <div class="bottom">

                    <strong class="price" v-if="list.isFlashSale == '' || list.flashSaleStatus == 0">{{list.price / 1000 | price}}<b>元/{{list.unit}}</b></strong>
                    <strong class="price" v-if="list.isFlashSale == 1">{{list.flashSalePrice / 1000 | price}}<b>元/{{list.unit}}</b></strong>

                    <div class="go" v-if="list.isFlashSale == 1">马上抢</div>

                    <car-count ref="carcount" @modifyShopCarCount="modifyShopCarCount" v-if="list.isFlashSale != 1 && list.inventory > 0" :type="false" :index="index" :is-house-user="list.isHouseUser" :commodity-id="list.commodityId" :shop-car-count="list.shopCarCount" :inventory="list.inventory"></car-count>
                  </div>
                </router-link>
              </div>
            </li>
          </ul>
        </div>


        <!-- 搜索记录列表 -->
        <div class="searchRecord" v-show="isSearchRecord">
          <ul>
            <li v-for="(list,index) in searchRecord" @click="selectHistory(list.name)" v-bind:key="index">
              <span>{{list.name}}</span>
              <i></i>
            </li>
          </ul>
          <div class="exit" @click="deleteHistory">清除搜索历史</div>
        </div>

        <!-- 无数据 -->
        <not-data v-show="isNotData"></not-data>

        <modal-toast ref="modalToast"></modal-toast>



    </article>
    <footer>
      <div class="footerCart">
        <div class="total">
          合计：<b>￥0.00</b><em>(已选11件)</em>
        </div>
        <router-link class="next" :to="{path:'shopping',query:{projectId:projectId}}">
          下一步
        </router-link>
      </div>
    </footer>
  </div>

</template>
<script>
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import carCount from '../common/carCount.vue';
import notData from '../common/notData.vue'
import modalToast from '../common/modalToast.vue'
import cart from '../../plugins/cart'

export default {
  name: 'search',
  data() {
    return{
      projectId:simplestorage.get('projectId'),
      distributionCommunityId:simplestorage.get('HLXK_DISTRIBUTION').id,
      is:false,                   // 是否显示搜索列表
      isLoad:false,               // 值为真，禁用无限滚动
      lists:'',
      searchRecord:[],            // 搜索记录
      isSearchRecord:false,       // 是否显示-搜索记录列表
      keyWord:'',
      isNotData:false,            // 是否显示-无数据
      isExit:false,               // 是否显示-取消
      pageSize:5,
      pageIndex:1
    }
  },
  mounted() {

    // 读取缓存中历史记录
    this.queryHistory()

    // 获取购物车选中数据
    this.getCheckShopping();

  },
  methods: {
    loadMore:function(){
      this.search();
      /*

          有数据
          没数据
          有历史记录

          进入有历史记录就显示.可以
          搜索，有数据显示数据，没数据显示提示无数据
          点取消会显示历史记录

       */
    },
    search:function(){
      let _this = this;
      // 是否有输入值
      if (!_this.keyWord) return;
      // 关闭加载
      _this.isLoad = true;
      // 显示加载中
      _this.$refs.modalToast.toast({
        txt:'加载中',
        icon:'loading',
        time:0
      });
      // 搜索
      this.$http.post('/community/getCommodityPage', {
        "projectId":simplestorage.get('projectId'),
        "distributionCommunityId":_this.distributionCommunityId,
        "pageIndex": _this.pageIndex,
        "pageSize": _this.pageSize,
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
        let length = res.data.data.length;
        /*

          有数据.长度 > 0
          无数据.分第一次无数据、加载到无数据
          第一次_this.pageIndex，后面的就++，已不等于1

        */
        if(_this.pageIndex == 1 && length == 0){
          // 第一次无数据
          // 隐藏加载中
          _this.$refs.modalToast.is = false;
          // 显示无数据提示
          _this.isNotData = true;
          // 隐藏列表
          _this.is = false;
          // 隐藏历史列表
          _this.isSearchRecord = false;
          return false;
        }
        // 隐藏无数据提示
        _this.isNotData = false;
        // 隐藏历史列表
        _this.isSearchRecord = false;
        // 显示列表
        _this.is = true;
        // 后面的加载
        if(length > 0){
          // 有数据
          // 数据
          _this.lists = _this.lists.concat(res.data.data);
          // 开启加载
          _this.isLoad = false;
          // 下一页
          _this.pageIndex ++;
        }
          // 后面加载到无数据
          //console.log('加载到无数据')

        // 隐藏加载中
        _this.$refs.modalToast.is = false;
      }).catch(function(error) {
        console.log(error)
      })

    },
    submit:function(){
      // 清空列表
      this.lists = [];
      // 清空页数
      this.pageIndex = 1;
      // 清除滚动值
      this.$refs.scrollContent.scrollTop = 0;
      // 添加到本地缓存中
      this.addHistory();
      this.search();
    },
    // 取消搜索
    exit:function(){
      // 隐藏列表
      this.is = false;
      // 搜索历史不为空就显示
      if(this.searchRecord.length > 0){
        this.isSearchRecord = true;
      }
      // 隐藏自己
      this.isExit = false;
    },
    // 得到焦点显示
    searchFocus:function(){
      this.isExit = true;
    },
    // 失去焦点隐藏.不需要了...
    searchBlur:function(){
      this.isExit = false;
    },
    // 从缓存里读取记录
    queryHistory:function(){
      this.searchRecord = simplestorage.get('_searchList') || [];
      // 搜索历史不为空就显示
      if(this.searchRecord.length > 0){
        this.isSearchRecord = true;
      }
    },
    // 新增历史记录
    addHistory:function(){
      let _this = this;
      if (!_this.keyWord) return;
      var searchList = simplestorage.get('_searchList') || [];

      // 把相同的删除
      let i = searchList.findIndex(function(value, index, arr) {
        return value.name == _this.keyWord;
      });
      if (i !== -1) {
        searchList.splice(i, 1)[0];
        simplestorage.set('_searchList', searchList);
      }
      // 超过10条
      if(searchList.length >= 10) searchList.pop();
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
        this.searchRecord = [];
        this.isSearchRecord = false;
      }
    },
    // 选择历史记录
    selectHistory:function(name){
      this.keyWord = name;
      this.submit();
    },
    /************************************************************************************************/
    // 获取购物车选中数据
    getCheckShopping:function(){
      let _this = this;
      let url;

      //// 登录、未登录............................
      if(_this.isLogin){

        // 购物车详情
        _this.$http.post('/community/getCartInfo', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          //"checkGoodsInfo":_this.getCheckGoods()
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
          // 加载购物车数据
          _this.lists = res.data;
          // console.log(JSON.stringify(_this.lists))

        }).catch(function(error) {
          console.log(error)
        })

      }else{

        var jsonStr = cart.queryAllJsonStr();

        // 未登录.加载.本地缓存购物车信息查询
        this.$http.post('/community/getCartInfoByGoodsInfo', {
          "projectId":simplestorage.get('projectId'),
          "distributionCommunityId":simplestorage.get('HLXK_DISTRIBUTION').id,
          //"checkGoodsInfo":_this.getCheckGoods(),       // 传了会返回选中的信息
          "goodsInfo": jsonStr
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
          // 加载购物车数据
          _this.lists = res.data;
          //console.log(JSON.stringify(_this.lists))

        }).catch(function(error) {
          console.log(error)
        })

      }

    },
    // 获取全部商品json
    getCheckGoods :function(str){
      let _this = this;
      let jsonStr = "[";

      if(_this.isLogin){

        // 只有选中状态需要
        for(let i = 0;i < _this.checkCommodityId.length;i++){
          _this.lists.cartGoodsList.forEach(function(item){
            item.goodsList.forEach(function(goodsList,index){
              if(_this.checkCommodityId[i] == goodsList.goodsId && goodsList.quantity != undefined){
                if (i != 0) {
                  jsonStr += ","
                }
                if(str == "pay"){
                  jsonStr += "{goodsId:" + goodsList.goodsId + ",amount:" + goodsList.quantity + ",price:" + goodsList.price +"}"
                }else{
                  jsonStr += "{goodsId:" + goodsList.goodsId + ",amount:" + goodsList.quantity + "}"
                }
              }
            })
          });
        }

      }else{
        let HLXK_SHOPPING = simplestorage.get('HLXK_SHOPPING');

        _this.checkCommodityId.forEach(function(value,i){
          HLXK_SHOPPING.forEach(function(goodsList){
            if(value == goodsList.id){
              if (i != 0) {
                jsonStr += ","
              }
              if(str == "pay"){
                jsonStr += "{goodsId:" + goodsList.id + ",amount:" + goodsList.amount + ",price:" + goodsList.price +"}"
              }else{
                jsonStr += "{goodsId:" + goodsList.id + ",amount:" + goodsList.amount + "}"
              }
            }
          });

        })

      }

      jsonStr += "]";
      return jsonStr;
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
<style scoped lang="scss" src="../../assets/styles/search.scss"></style>
