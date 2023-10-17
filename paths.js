//Preguntar si es una ruta relativa o absoluta (path.isAbsolute()) (si es relativa se transforma en absoluta (path.resolve([...paths])))
//Verificar la existencia de la ruta en el computador (fsPromises.access(path[, mode]))
//Verficar si la extensión es Markdown (path.extname(path))
const fs = require("fs");
const path = require("path");
const findLinks = require("./extractlinks");

let mdFile = "prueba/prueba1.md";

function resolvingPath(link) {
  let pathToAbsolute = "";

  if (path.isAbsolute(link) === false) {
    const absolutePath = path.resolve(__dirname, link);
    pathToAbsolute = absolutePath;
    console.log("La ruta no es absoluta ❎  Transformando a absoluta 🛠️");
  } else {
    pathToAbsolute = link;
    console.log("La ruta es absoluta ✅");
  }

  if (path.extname(pathToAbsolute) !== ".md") {
    console.error("¡El archivo no es markdown! ❎");
    return false;
  } else {
    console.log("¡El archivo es markdown! ✅");

    try {
      fs.accessSync(pathToAbsolute, fs.constants.F_OK);
      console.log(`${pathToAbsolute} existe ✅`);
      findLinks(pathToAbsolute);
      return true;
    } catch (error) {
      console.error(`${pathToAbsolute} no existe ❎`);
      return false;
    }
  }
}

/* function verifyPath(link) {
  const result = resolvingPath(link);

  if (result === true) {
    console.log("Se cumplieron las condiciones necesarias ✅");
    return true;
  } else {
    console.error("No se cumplieron las condiciones necesarias ❎");
    return false;
  }
} */

resolvingPath(mdFile);

// module.exports = verifyPath;
