const colors = require("colors");
const fs = require("fs");

function extractFiles(directory) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(directory)) {
      reject(
        new Error(`\nLa ruta ${directory} es incorrecta o no existe❎\n`.red)
      );
      return;
    } else {
      console.log(`\nLa ruta ${directory} existe ✅`.green);
    }

    const fileNames = fs.readdirSync(directory);
    if (fileNames.length === 0) {
      reject(new Error(`\nLa ruta ${directory} está vacía ❎\n`.red));
    } else {
      resolve(fileNames);
    }
  });
}

extractFiles("C:/Users/Usuario/md-links/prueba")
  .then((files) => {
    console.log("\nEstos son los archivos encontrados:\n".rainbow, files);
  })
  .catch((error) => {
    console.error(error);
  });
