const resolvingPath = require("./paths");
const makeRequest = require("./validate");

//Función que resuleve el arreglo de links

//Crear una función que retorne una promesa con los links encontrados dentro del archivo md
//¿Qué promete la promesa? Enviar los links como un arreglo de objetos en el caso de fulfilled y en el caso que sea rechazada un error
function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    // 
    resolvingPath(path)
      .then((links) => {
        if (validate === "true") {
          makeRequest(links)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(links); // También puedes retornar los enlaces para su uso posterior
        }
      })
      .catch((error) => {
        reject(error);
        // console.error('El archivo no existe o el path es incorrecto ❎');
      });
  });
}

module.exports = mdLinks;

//La función debe ser un módulo importable
//La función debe retornar una promesa que resuleva a un arreglo de objetos donde cada link contiene: href, text, file.
