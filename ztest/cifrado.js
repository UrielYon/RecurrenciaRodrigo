var CryptoJS = require("crypto-js");
var ob = {
    user: "rodrigo",
    pass: "1"

}

// console.log(ob)
//     // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(ob.pass, 'SCSDC');

// console.log("salida: [" + ciphertext.toString() + "]");
// ob.pass = ciphertext.toString();
// // Decrypt
// console.log(ob)

// var bytes = CryptoJS.AES.decrypt('U2FsdGVkX19lY/UhoG+COY/yXbt4xXyMUFBiMx7dKlA=', 'SCSDC');

// //var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'SCSDC');
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);

// console.log("cifrado: [" + plaintext + "]");
// //Secretaría de Comunicación Social y Divulgación de la Ciencia de la Facultad de Ciencias
var hash = CryptoJS.SHA1("1");
console.log(hash.toString())

console.log(hash.toString(CryptoJS.enc.Base64));