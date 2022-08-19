import crypto, {createHash} from "crypto";

/**
 * AES 256 CBC模式加密函数
 * @param key 密钥
 * @param text 待加密的文本
 * @returns {string} 加密后的文本
 */
function encrypt(key,text) {
    let iv = Buffer.from(key, 'hex');
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv); //使用aes-256-cbc 加密方法
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return  encrypted.toString('base64');
}

/**
 * 解密函数
 * @param key 密钥
 * @param text 待解密的文本
 * @returns {string}  解密后的文本
 */
function decrypt(key,text) {
    let iv = Buffer.from(key, 'hex');
    let encryptedText = Buffer.from(text, 'base64');
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

/**
 *  计算签名
 * @param secretKey AES密钥
 * @param token token
 * @param oppID opportunity ID
 * @param oppNum  opp numbe
 * @param oppStage  状态
 * @param opportunityOwner 所属BC
 * @param timeStamp 时间戳
 * @returns {string} 签名
 */
function getSignature(secretKey,token, oppID, oppNum, oppStage,opportunityOwner,timeStamp) {
    const content = `${token}&${oppID}&${oppNum}&${oppStage}&${opportunityOwner}&${timeStamp}`; //计算签名的内容 请保证参数的顺序，参数参数之间用&分隔
    const hash =createHash('sha256').update(content).digest('base64'); // 计算签名 ，使用sha256方式签名，并使用base64 方式进行编码
    const cyphertext = encrypt(secretKey,hash);// 加密签名
    return cyphertext; //返回签名
}

/**
 * 验证签名
 * @param secretKey AES密钥
 * @param signature 签名
 * @param token token
 * @param oppID opportunity ID
 * @param oppNum opp numbe
 * @param oppStage 状态
 * @param opportunityOwner 所属BC
 * @param timeStamp 时间戳
 * @returns {boolean} 是否验证通过
 */
function verifySignature(secretKey,signature,token, oppID, oppNum, oppStage,opportunityOwner,timeStamp){
    const content = `${token}&${oppID}&${oppNum}&${oppStage}&${opportunityOwner}&${timeStamp}`;
    const hash =createHash('sha256').update(content).digest('base64');
    const decrypttext = decrypt(secretKey,signature);
    return hash === decrypttext;
}

/**
 * 调用示例
 */


const secretKey = '27173bf042d043c411824eeb923f5f20'; // AES密钥
const token = '4196566f95524e4eb5d20c22da8f796a'; // token
const timeStamp = Date.now(); // 时间戳
/**
 * 即将发送的请求体
 */
var postBody = {
    token: token,
    oppID:'123',
    oppNum:'O89898989',
    oppStage:1,
    opportunityOwner:'Amy',
    timeStamp:timeStamp
}
const signature = getSignature(secretKey ,postBody.token, postBody.oppID, postBody.oppNum, postBody.oppStage, postBody.opportunityOwner, postBody.timeStamp);
postBody.signature = signature;




/**
 * 验证签名
 */
let verify = verifySignature(secretKey,signature,postBody.token, postBody.oppID, postBody.oppNum, postBody.oppStage, postBody.opportunityOwner, postBody.timeStamp);
console.log(verify?'验证通过':'验证失败');

console.log(crypto.randomBytes(16).toString('hex'));
