import ecc from 'eosjs-ecc';

export const encrypt = ({ privateKey, publicKey, plainText }) => {
  //event.preventDefault();
  console.log('Encrypt!');
  //let message = "GO FUCK YOurself Yeaeyesyeeyseeyeys.";
  const cyphertext = ecc.Aes.encrypt(privateKey, publicKey, plainText);

  console.log(binaryToString(cyphertext.message.toString()));
  const { nonce, message, checksum } = cyphertext;
  const res = { nonce, message, checksum };
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
  console.log('decrypt!!!');

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
