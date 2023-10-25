const colors = require("colors");
const fs = require("fs");

function fileExists(paths) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(paths)) {
      reject(
        new Error(
          `\nEl archivo no existe o la ruta ${paths} es incorrecta ❎\n`.red
        )
      );
      return;
    } else {
      console.log(`\nLa ruta ${paths} existe ✅`.green);
    }

    const fileType = fs.statSync(paths);
    if(fileType.isFile() === true) {
      console.log(`\nLa ruta ${paths} es un archivo ✅`.green);
      resolve(true);
    } else {
      console.log(`\nLa ruta ${paths} es un directorio ✅`.green);
      resolve(false);
    }
  });
}

module.exports = fileExists;