/* module.exports = () => {
  // ...
}; */
const fs = require('fs');
const path = require('path');
const axios = require('axios');


//Función que resuleve el arreglo de links

//Crear una función que retorne una promesa con los links encontrados dentro del archivo md
//¿Qué promete la promesa? Enviar los links como un arreglo de objetos en el caso de fulfilled y en el caso que sea rechazada un error
let sentLinks = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});

sentLinks() //módulo para exportar
.then(links => {
  // => [{ href, text, file }, ...]
})
.catch(console.error);
//La función debe ser un módulo importable 
//La función debe retornar una promesa que resuleva a un arreglo de objetos donde cada link contiene: href, text, file.

console.log(prueba);