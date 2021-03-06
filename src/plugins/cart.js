import simplestorage from 'simplestorage.js'



/*购物车相关操作*/
var cart = {
  //isLogin:simplestorage.get('HLXK_STATUS'),
  // 小区id
  //distributionCommunityId : simplestorage.get('HLXK_DISTRIBUTION').id,
  // 购物车本地缓存数据...
  lists : simplestorage.get('HLXK_SHOPPING') || [],
  //name: 'HLXK_SHOPPING',
  //lists: JSON.parse(simplestorage.get('HLXK_SHOPPING') || '[]'),
  // 新增商品
  increase: function(commodityId,n) {
    let _this = this;
    let distributionCommunityId = simplestorage.get('HLXK_DISTRIBUTION').id;
    let num = parseInt(n) || 1;
    // 添加购物车....本地缓存
    let i = _this.lists.findIndex(function(value, index, arr) {
      return (value.id == commodityId && value.distributionCommunityId == distributionCommunityId);
    });
    if (i !== -1) {
      // 库存+1
      _this.lists[i].amount += num;
    } else {
      let obj = {
        "distributionCommunityId":distributionCommunityId,
        "id":commodityId,
        "amount":num
      };
      _this.lists.push(obj);
    }

    _this.update();

  },
  //减少商品
  reduce: function(commodityId) {
    let _this = this;
    let distributionCommunityId = simplestorage.get('HLXK_DISTRIBUTION').id;
    // 本地缓存
    let i = _this.lists.findIndex(function(value, index, arr) {
      return (value.id == commodityId && value.distributionCommunityId == distributionCommunityId);
    });

    if (i !== -1) {
      if (_this.lists[i].amount === 1) {
        // 删除本商品
        _this.remove(commodityId);
      } else {
        _this.lists[i].amount -= 1;
        _this.update();
      }
    }

    //simplestorage.set('HLXK_SHOPPING',_this.lists);

  },
  /**
   * 查询商品
   * @param  {Number} id 商品id
   * @return {Object}    商品信息
   */
  query: function(id) {

  },
  /**
   * 查询所有商品
   * @return {Array} 商品列表
   */
  queryAll: function(flag) {
    // 本来就没转成str....

    let _this = this;
    let distributionCommunityId = simplestorage.get('HLXK_DISTRIBUTION').id;

    var ls = _this.lists;
    if(!flag){
      ls = _this.lists.filter(function(item) {
        return item.distributionCommunityId == distributionCommunityId;
      });
    }
    return ls;

  },
  /**
   * 查询所有商品
   * @return {Object} 商品列表json
   */
  queryAllJsonStr: function(flag) {

    let _this = this;
    let distributionCommunityId = simplestorage.get('HLXK_DISTRIBUTION').id;

    //var cid = cookie.get('distributionCommunityId');
    //if(isNaN(cid)) return $.toast('便利店不存在');

    var cartInfo = _this.lists;
    var jsonStr = "[";
    for (var i = 0; i < cartInfo.length; i++) {
      if(!flag && cartInfo[i].distributionCommunityId != distributionCommunityId) continue;
      var goodsId = cartInfo[i].id;
      var cid = cartInfo[i].distributionCommunityId;
      var amount = cartInfo[i].amount;
      if (amount != undefined) {
        if (i != 0) {
          jsonStr += ","
        }
        jsonStr += "{goodsId:" + goodsId + ",amount:" + amount + ",distributionCommunityId:" + cid + "}"
      }
    }
    jsonStr += "]";
    return jsonStr;

  },
  // 移除单个商品
  remove: function(commodityId) {
    let _this = this;
    let distributionCommunityId = simplestorage.get('HLXK_DISTRIBUTION').id;
    // 本地缓存
    let i = _this.lists.findIndex(function(value, index, arr) {
      return (value.id == commodityId && value.distributionCommunityId == distributionCommunityId);
    });

    if (i !== -1) {
      _this.lists.splice(i, 1)[0];
    }

    _this.update();
  },
  /**
   * 移除一组商品
   * @param  {Number} id 商品id
   * @return {Object}    移除的商品信息
   */
  removeIds: function(ids) {
    let _this = this;
    let distributionCommunityId = simplestorage.get('HLXK_DISTRIBUTION').id;

    ids.forEach(function(v){

      console.log(v)
      let i = _this.lists.findIndex(function(value, index, arr) {
        return (value.id == v && value.distributionCommunityId == distributionCommunityId);
      });

      if (i !== -1) {
        _this.lists.splice(i, 1)[0];
      } else {
        alert('该商品不在购物车中(id:' + id + ')')
      }
      _this.update();

    })

  },
  /**
   * 移除所有商品
   * @return {Arrray} 移除的所有商品列表
   */
  removeAll: function() {
    var ls = this.lists;
    this.lists = [];
    this.update();
    return ls;
  },
  // 获取商品总数量
  getAmount: function() {
    let _this = this;
    let distributionCommunityId = simplestorage.get('HLXK_DISTRIBUTION').id;

    var amount = 0;
    _this.lists.forEach(function(value){
      // 此小区商品总数量
      if(value.distributionCommunityId == distributionCommunityId) amount += value.amount;
    });

    return amount;
  },
  // 查询某商品数量
  getIdAmount: function(commodityId) {
    // 缓存列表、小区id
    let _this = this;
    let distributionCommunityId = simplestorage.get('HLXK_DISTRIBUTION').id;

    var amount = 0;
    let i = _this.lists.findIndex(function(value, index, arr) {
      return (value.id == commodityId && value.distributionCommunityId == distributionCommunityId);
    });
    if (i !== -1) {
      amount = _this.lists[i].amount;
    }
    return amount;
  },
  /**
   * 获取所有商品id
   * @return {Array} 商品id列表
   */
  getIdList: function() {

  },
  update: function() {
    //simpleStorage.set(this.name, JSON.stringify(this.lists));
    simplestorage.set('HLXK_SHOPPING',this.lists);
  }

};


export default cart;



