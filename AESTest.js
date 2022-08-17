
import {v4 as uuidv4} from 'uuid';
import  AES256CBC from './AES256.js';


const  aeskey = "24971a98a3f233f1776a2f87773c3d26"
const  token = uuidv4().replaceAll("-", "");
const  oopNum = "O100000000"
const  timestamp = Date.now();
const content = `${token}&${oopNum}&${timestamp}`

const AESHelper = new AES256CBC(aeskey);

console.log("得到一个新的秘钥：",AESHelper.newRandomKey());

console.log("加密前：",content)

const cyphertext = AESHelper.encrypt(content);
console.log('加密后： ',cyphertext);

const decrypttext = AESHelper.decrypt(cyphertext);
console.log("解密后：",decrypttext);
