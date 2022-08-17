
import  crypto  from 'crypto';


/**
 * AES256 CBC模式加解密类
 */
 class AES256CBC {

    /**
     * 构造函数
     * @param key
     */
    constructor(key) {
         this.key = key;
   }

     /**
      * 计算一个新鞋秘钥
      * @returns {string}
      */
   newRandomKey() {
        return crypto.randomBytes(16).toString('hex');
   }

     /**
      * 加密
      * @param text
      * @returns {string}
      */
   encrypt(text) {
        let iv = Buffer.from(this.key, 'hex');
        let cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return  encrypted.toString('base64');
    }

     /**
      * 加密
      * @param text
      * @returns {string}
      */

   decrypt(text) {
        let iv = Buffer.from(this.key, 'hex');
        let encryptedText = Buffer.from(text, 'base64');
        let decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}

export default AES256CBC;



