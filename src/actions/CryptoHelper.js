import ecc from 'eosjs-ecc';

export const encrypt = ({ privateKey, publicKey, plainText }) => {
  const cyphertext = ecc.Aes.encrypt(privateKey, publicKey, plainText);
  console.log('Cyphertext', cyphertext);
  console.log(binaryToString(cyphertext.message.toString()));
  const { nonce, message, checksum } = cyphertext;
  const nonceStr = nonce.toString();
  const res = { nonce: nonceStr, message, checksum };
  return res;
};

// const textToBin = text => {
//   const length = text.length;
//   const output = [];
//   for (let i = 0; i < length; i++) {
//     const bin = text[i].charCodeAt().toString(2);
//     output.push(Array(8 - bin.length + 1).join('0') + bin);
//   }
//   return output.join('');
// };

export const decrypt = ({
  privateKey,
  publicKey,
  nonce,
  encryptedMessage,
  checksum
}) => {
  console.log(privateKey, publicKey, nonce, encryptedMessage, checksum);
  const plaintext = ecc.Aes.decrypt(
    privateKey,
    publicKey,
    nonce,
    encryptedMessage,
    checksum
  );
  console.log(binaryToString(plaintext.toString()));
  return binaryToString(plaintext.toString());
};

const binaryToString = str => {
  console.log('str: ', str);
  // Removes the spaces from the binary string
  str = str.replace(/\s+/g, '');
  // Pretty (correct) print binary (add a space every 8 characters)
  str = str.match(/.{1,8}/g).join(' ');

  const newBinary = str.split(' ');
  console.log('newBinary: ', newBinary);

  return newBinary.join('');
};
