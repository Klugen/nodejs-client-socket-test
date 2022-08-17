import AES256CBC from "./AES256.js";
import {createHash} from 'crypto'

class ZFJSignatureHelper{
    constructor(secretKey,token, oopNum, orderstatus,timestamp= Date.now()) {
        this.secretKey = secretKey;
        this.token = token;
        this.oopNum = oopNum;
        this.timestamp = timestamp;
        this.orderstatus = orderstatus;
        this.AES256CBC = new AES256CBC(this.secretKey);
    }

    /**
     * 获取签名
     * @returns {string}
     */
    getSignature(){
        const content = `${this.token}&${this.oopNum}&${this.orderstatus}&${this.timestamp}`;
        const hash =createHash('sha256').update(content).digest('base64');
        const cyphertext = this.AES256CBC.encrypt(hash);
        return cyphertext;
    }

    /***
     * 校验签名
     * @param signature
     * @returns {boolean}
     */
    verifySignature(signature){
        const content = `${this.token}&${this.oopNum}&${this.orderstatus}&${this.timestamp}`;
        const hash =createHash('sha256').update(content).digest('base64');
        const decrypttext = this.AES256CBC.decrypt(signature);
        return hash === decrypttext;
    }

}

export default  ZFJSignatureHelper;
