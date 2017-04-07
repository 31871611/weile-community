import crypto from 'crypto'

let cryptoUtils = {}

// md5加密
cryptoUtils.md5 = function(data) {
  let buffer = new Buffer(data);
  return crypto.createHash('md5').update(buffer.toString('binary')).digest('hex');
};
// aes加密
cryptoUtils.aesEncrypt = function(data, key) {
  let iv = '';
  let clearEncoding = 'utf8';
  let cipherEncoding = 'base64';
  let cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
  let cipherChunks = [];
  cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
  cipherChunks.push(cipher.final(cipherEncoding));
  return cipherChunks.join('');
};
// aes解密
cryptoUtils.aesDecrypt = function(data, key) {
  let iv = '';
  let clearEncoding = 'utf8';
  let cipherEncoding = 'base64';
  let decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
  let plainChunks = [];
  plainChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
  plainChunks.push(decipher.final(clearEncoding));
  return plainChunks.join('');
};

export default cryptoUtils
