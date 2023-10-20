//Preguntar si es una ruta relativa o absoluta (path.isAbsolute()) (si es relativa se transforma en absoluta (path.resolve([...paths])))
//Verificar la existencia de la ruta en el computador (fsPromises.access(path[, mode]))
//Verficar si la extensión es Markdown (path.extname(path))
const colors = require("colors");
const fs = require("fs");
const path = require("path");
const { findLinks } = require("./extractlinks");

function resolvingPath(paths) {
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

    let pathToAbsolute = "";

    if (!path.isAbsolute(paths)) {
      const absolutePath = path.resolve(__dirname, paths);
      pathToAbsolute = absolutePath;
      console.log(
        "\nLa ruta no es absoluta ❎  Transformando a absoluta 🛠️".yellow
      );
    } else {
      pathToAbsolute = paths;
      console.log("\nLa ruta es absoluta ✅".green);
    }

    if (
      !/\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/i.test(
        path.extname(pathToAbsolute)
      )
    ) {
      reject(new Error("\n¡El archivo no es markdown! ❎\n".red));
      return;
    } else {
      console.log("\n¡El archivo es markdown! ✅".green);
      findLinks(pathToAbsolute)
        .then((links) => {
          resolve(links);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

module.exports = resolvingPath;
