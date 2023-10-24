//importar axios
//mdLinks debe tener otro parámetro llamado validate
//parámetro de validate estará conectado con función de mdLinks

//Función de validate
//Añadir status y ok/fail a cada elemento del objeto
//Validate será un parámetro opcional (true o false)
//Status con axios
const axios = require("axios");

function makeRequest(links) {
  return new Promise((resolve, reject) => {
    const promises = links.map((link) => {
      return axios
        .get(link.url)
        .then((res) => {
          link.status = res.status;
          link.statusText = res.statusText;
        })
        .catch((err) => {
          if (err.response) {
            link.status = err.response.status;
            link.statusText = err.response.statusText;
          }
        });
    });
// return Promise.all(promises)
    Promise.all(promises)
      .then(() => {
        resolve(links);
      })
      .catch((error) => {
        reject(error); // Rechaza la Promesa si hay errores en las solicitudes
      });
  });
}


module.exports = makeRequest;
