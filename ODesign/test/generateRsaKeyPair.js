const crypto = require('crypto');

function generateRsaKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          publicKey,
          privateKey,
        });
      },
    );
  });
}

generateRsaKeyPair()
  .then(({ publicKey, privateKey }) => {
    console.log('Public Key:');
    console.log(publicKey);
    console.log('\nPrivate Key:');
    console.log(privateKey);
  })
  .catch((err) => {
    console.error('Error generating RSA key pair:', err);
  });
