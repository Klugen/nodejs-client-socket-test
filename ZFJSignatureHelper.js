import AES256CBC from "./AES256.js";

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
        const cyphertext = this.AES256CBC.encrypt(content);
        return cyphertext;
    }

    /***
     * 校验签名
     * @param signature
     * @returns {boolean}
     */
    verifySignature(signature){
        const decrypttext = this.AES256CBC.decrypt(signature);
        const [token, oopNum,orderstatus, timestamp] = decrypttext.split("&");
        return token == this.token && oopNum == this.oopNum&&this.orderstatus == orderstatus && timestamp == this.timestamp;
    }

}

export default  ZFJSignatureHelper;
