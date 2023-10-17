const mdLinks = require('./index');

const path = process.argv[2]; // El primer argumento después de "node app.js" será la ruta del archivo a analizar.

if (path) {
  mdLinks(path)
    .then((links) => {
      console.log('Enlaces encontrados:', links);
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.error('Por favor, proporciona la ruta de un archivo Markdown como argumento❗');
}


