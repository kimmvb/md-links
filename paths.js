//Preguntar si es una ruta relativa o absoluta (path.isAbsolute()) (si es relativa se transforma en absoluta (path.resolve([...paths])))
//Verificar la existencia de la ruta en el computador (fsPromises.access(path[, mode]))
//Verficar si la extensión es Markdown (path.extname(path))
const fs = require("fs");
const path = require("path");
const findLinks = require("./extractlinks");

function resolvingPath(paths) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(paths)) {
      reject(new Error(`El archivo no existe o el ${paths} es incorrecto ❎`));
      return;
    } else {
      console.log(`${paths} existe ✅`);
    }

    let pathToAbsolute = "";

    if (!path.isAbsolute(paths)) {
      const absolutePath = path.resolve(__dirname, paths);
      pathToAbsolute = absolutePath;
      console.log("La ruta no es absoluta ❎  Transformando a absoluta 🛠️");
    } else {
      pathToAbsolute = paths;
      console.log("La ruta es absoluta ✅");
    }

    if (!/\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/i.test(path.extname(pathToAbsolute))) {
      reject(new Error("¡El archivo no es markdown! ❎"));
      return;
    } else {
      console.log("¡El archivo es markdown! ✅");
      findLinks(pathToAbsolute)
        .then((links) => {
          resolve(links);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  });
}

module.exports = resolvingPath;

