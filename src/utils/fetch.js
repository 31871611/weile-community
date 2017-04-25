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
function encryptData(encryptType, data, session, key) {
  let result = {}
  let _d = {
    encryptType: encryptType,
    data: data
  }
  switch (+_d.encryptType) {
    case 0:
      _d.session = session
      _d.data = JSON.stringify(_d.data)
      result.request = JSON.stringify(_d)
      break
    case 1:
      _d.session = session
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
    'clientphone': navigator.platform,
  },
})

// request interceptor
fetch.interceptors.request.use(function(config) {
  let _d = config.data || {}
  let key = _d.key || simplestorage.get('HLXK_KEY')
  let session = _d.session || simplestorage.get('HLXK_SESSION')
  let encryptType = config.encryptType || 0
  /*
  * encryptType : 0 明文, 1 AES加密
  * _d :
  * session ：
  * key :
  *
  * */
  config.data = qs.stringify(encryptData(encryptType, _d, session, key))
  config.url = isProduction ? config.url : '/api' + config.url
  return config
}, function(error) {
  return Promise.reject(error)
})

// response interceptor
fetch.interceptors.response.use(function(response) {
  let _d = response.data || {}
  let key = _d.key || simplestorage.get('HLXK_KEY')
  return decryptData(response.data, key)
}, function(error) {
  return Promise.reject(error)
})

export default fetch
