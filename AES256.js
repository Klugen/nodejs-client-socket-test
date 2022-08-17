
import  crypto  from 'crypto';



 class AES256CBC {
   constructor(key) {
         this.key = key;
   }

   encrypt(text) {
        let iv = Buffer.from(this.key, 'hex');
        let cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return  encrypted.toString('base64');
    }


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



