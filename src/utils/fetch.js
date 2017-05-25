import { VERSION } from './config'
import Promise from 'es6-promise'
Promise.polyfill()
import axios from 'axios'
import qs from 'qs'
import Fingerprint from 'fingerprintjs'
import simplestorage from 'simplestorage.js'
import cryptoUtils from './cryptoUtils'

let isProduction = process.env.NODE_ENV === 'production'

let HLXK_SESSION = simplestorage.get('HLXK_SESSION') || ''
let HLXK_KEY = simplestorage.get('HLXK_KEY') || ''
let wechatInfo = navigator.userAgent.match(/(MicroMessenger\/[\d\.]+)/i) || ['other']

// 加密
function encryptData(encryptType, data, session, key, sessionid) {
  let result = {}
  let _d = {
    encryptType: encryptType,
    data: data
  }
  switch (+_d.encryptType) {
    case 0:
      _d.session = session
      _d.sessionid = sessionid
      _d.data = JSON.stringify(_d.data)
      result.request = JSON.stringify(_d)
      break
    case 1:
      _d.session = session
      _d.sessionid = sessionid
      _d.data = cryptoUtils.aesEncrypt(JSON.stringify(_d.data), key)
      result.request = JSON.stringify(_d)
      break
    case 2:
      result.sign = cryptoUtils.md5(JSON.stringify(_d))
      _d.data = JSON.stringify(_d.data)
      result.request = JSON.stringify(_d)
      break
    default:
  }
  return result
}

// 解密
function decryptData(data, key) {
  let o = data || {}
  if (+o.encryptCode === 1 && o.data) {
    try {
      data = cryptoUtils.aesDecrypt(o.data, key)
    } catch (e) {
      o.errorMsg = '解密异常！'
      return o
    }
    try {
      o.data = JSON.parse(data)
    } catch (e) {
      o.errorMsg = 'JSON 解析异常！'
      return o
    }
  }
  return o
}

const fetch = axios.create({
  timeout: 10000,
  headers: {
    'clientos': '102',
    'osversion': wechatInfo[0],
    'phoneuuid': new Fingerprint().get(),
    'shequVersion': VERSION,
    'clientphone': navigator.platform
  }
})

// request interceptor
fetch.interceptors.request.use(function(config) {
  let _d = config.data || {}
  let key = _d.key || simplestorage.get('HLXK_KEY')
  let session = _d.session || simplestorage.get('HLXK_SESSION')
  let sessionid = _d.sessionid || simplestorage.get('HLXK_SessionId')
  let encryptType = config.encryptType || 0
  /*
  * encryptType : 0 明文, 1 AES加密
  * _d :
  * session ：游客或已登录
  * sessionid :
  * key :
  *
  * */
  config.data = qs.stringify(encryptData(encryptType, _d, session, key, sessionid))
  config.url = isProduction ? 'http://117.27.139.221:5670' + config.url : '/api' + config.url
  return config
}, function(error) {
  return Promise.reject(error)
})

// response interceptor
fetch.interceptors.response.use(function(response) {
  let _d = response.data || {}
  // 状态码：错误...失效 _d.encryptCode == 1000 ?
  if(_d.resultCode == 1000){
    // 删除状态
    simplestorage.deleteKey('HLXK_STATUS')
    //simplestorage.deleteKey('projectId')
    //simplestorage.deleteKey('HLXK_SESSION')
    //simplestorage.deleteKey('HLXK_KEY')
    simplestorage.deleteKey('HLXK_DISTRIBUTION')
    // 提示
    console.log('登录异常，请重新登录');
    // 刷新页面.跳转去登录页面
    location.reload()
    return false;
  }
  let key = _d.key || simplestorage.get('HLXK_KEY')
  return decryptData(response.data, key)
}, function(error) {
  return Promise.reject(error)
})

export default fetch
