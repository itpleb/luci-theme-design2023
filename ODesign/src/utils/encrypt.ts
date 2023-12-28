import JSEncrypt from 'jsencrypt';
import * as CryptoJS from 'crypto-js';

// 假设您已经有了加密后的数据
const encryptedData = '...'; // 加密后的字符串

// 将加密后的字符串转换为 MD5 格式
const md5Value = CryptoJS.MD5(encryptedData).toString();

console.log('MD5 Value:', md5Value);

// 示例：一个 PEM 格式的公钥字符串
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq9/UnW7cjMgs3tNA1Ytp
YQMw+U3V1bbpPjU2ZgMNkG1d2wBstqXIcn3QjWH0MtVupUWGh+xwvgORZcrXRiqP
fQHcmuN7C9rrt7zA6Q8aK05v60Aqvn1XlBIaLC5w1mfAgGkci9OirdzzppjWtpr6
JMVNnMSC/TyHYhvS/W/CnhFU6B/ZqYf3Rp592cRBDubuEYuaidA1K8e7h93TxgYk
QkmiAi0g+M2PR6SNmPQ3+agQjpdhrJ6eTlGUgXqE0LKrgA9UnHK/awfaMPFuFNHM
iz+j3B0KYgv2MdKUy75HET8Lt4g+7DmZ8kKtxXGmd7PwKuHNDgoH/Vunq3vYS1+h
SwIDAQAB
-----END PUBLIC KEY-----
`; // 请替换为你的 PEM 公钥字符串
export function encryptRsaString(data: string): string {
  // 创建 JSEncrypt 实例
  const encrypt = new JSEncrypt();

  encrypt.setPublicKey(publicKey);

  // 使用公钥加密数据
  const encryptedData = encrypt.encrypt(data) as string;
  const md5Value = CryptoJS.MD5(encryptedData).toString();
  return md5Value;
}

// const dataToEncrypt = 'Your data to encrypt';
// const encryptedData = encryptWithPublicKey(publicKeyString, dataToEncrypt);
// console.log('Encrypted Data (Base64):', encryptedData);

/*

Public Key:
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq9/UnW7cjMgs3tNA1Ytp
YQMw+U3V1bbpPjU2ZgMNkG1d2wBstqXIcn3QjWH0MtVupUWGh+xwvgORZcrXRiqP
fQHcmuN7C9rrt7zA6Q8aK05v60Aqvn1XlBIaLC5w1mfAgGkci9OirdzzppjWtpr6
JMVNnMSC/TyHYhvS/W/CnhFU6B/ZqYf3Rp592cRBDubuEYuaidA1K8e7h93TxgYk
QkmiAi0g+M2PR6SNmPQ3+agQjpdhrJ6eTlGUgXqE0LKrgA9UnHK/awfaMPFuFNHM
iz+j3B0KYgv2MdKUy75HET8Lt4g+7DmZ8kKtxXGmd7PwKuHNDgoH/Vunq3vYS1+h
SwIDAQAB
-----END PUBLIC KEY-----


Private Key:
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCr39SdbtyMyCze
00DVi2lhAzD5TdXVtuk+NTZmAw2QbV3bAGy2pchyfdCNYfQy1W6lRYaH7HC+A5Fl
ytdGKo99Adya43sL2uu3vMDpDxorTm/rQCq+fVeUEhosLnDWZ8CAaRyL06Kt3POm      
mNa2mvokxU2cxIL9PIdiG9L9b8KeEVToH9mph/dGnn3ZxEEO5u4Ri5qJ0DUrx7uH      
3dPGBiRCSaICLSD4zY9HpI2Y9Df5qBCOl2Gsnp5OUZSBeoTQsquAD1Sccr9rB9ow      
8W4U0cyLP6PcHQpiC/Yx0pTLvkcRPwu3iD7sOZnyQq3FcaZ3s/Aq4c0OCgf9W6er      
e9hLX6FLAgMBAAECggEAFhmOTP35GvBkS0nY73xhEj8m+BoeMZWMMS+wwnYzCMv0      
l66FdrN4w4v87ykAuDFBwbuKXFuLyvWffPoTgICuzuaYjKFNFuL75eC94gR18MqW      
+9CrjlnZ6H6uty6eMLDKNli4TxxpMbeUQWrWn51Be80+OQxQQX/xHS2HDYe7e7fN      
2bOXsKTb0wBKuU9H26EI39xAAgGNruWisXzbTeeTyoHzTzd5TuJ/rHpnJrJhA1XY      
S6PVqBghA1/wTfCXqeEJDDuAaBXR8V3CuFcLRtaHij1zCICNepYCLmiF81zCDwgf      
jprC3UWuY6C+Y7vnSAYr6ao0D5CVQlG/x9eNwExc8QKBgQDRw6Iknmb0BIUlgkJr   
Ja4hUKuEiTnFX4KkxhYQYGWyiuTFW7ws1DBlm4dDoDX8ILlGFaDU04NTy1ydOUF4   
MTJlXQGpWycyxW6QLkWW4OEWjlzRpEGQWxfwJCqCeddrHBUsJYvvLy8gwDOErz4M   
gL4EkLlmK56CIKG354sibizJmwKBgQDRwi+UlMuvCUlWWVHU2boJpDgNgjQWrqVF   
huduAin4P3MlSrAGbOl6fd61hA+aXuONPR4GIPwwjrmnxLWoB0fCx4zGseYOkAx5   
XQfzpC/eJqhdBuyOLfSSjeqHvSJDUahQTi9S9nIsPFvY2JBB4e9Dnt+JJNwiNNXx   
cEQVSM2aEQKBgAOLDWsW7eBDT0hx6dNLgKR5a1xCwSIPWfKUkfzW1ADvDawzv3r2   
XpboyKEgzKikmNyRMvVFWVuJ/Nd/BxcTpalGp+eHbaMS6KowzeYdiE/MOc8kuiLJ   
Fx9sTPeFPVlG0Si8vZ9dqasg8/3Sw/aMGimTlD4gkH3cNT8Y/yWmvMTvAoGAG9yA   
N2sgNuqz3A1XKj+VT2yJqXmu84hVGYwWt20AKCI9aCmogeH7jTKk31VgQS/zZ7JD   
h6rf9I8wp9EgE+aLqJqa31WH6k1F6uTphno7hXV7DYg66ZO/FaxWB5uernRtN+V6   
sblcZvXJeV8ioi2he0jiBjRoLP75n+06jd0yuhECgYEAlOoVSaqNbUervo/9Gs6N   
76U4QAiP9TgBBdlRvcPSdW97zNnHLYs3CTJEaA8m3WdGUMF90od8LrPzmKxQirvy
Yvj1h2MOExFW97iCOVug0AHM1E+oCPTh/0pV9ap56FlAvSmYnMEedN2KJDnR+6gi
zev/YU/+L/n/dx+5iSujV94=
-----END PRIVATE KEY-----

*/
