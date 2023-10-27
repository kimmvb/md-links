const colors = require("colors");
const fs = require("fs");
const path = require("path");
const fileExists = require("./fileExists");
const resolvingPath = require("./paths");

function extractFiles(directory) {
  return new Promise((resolve, reject) => {
    fileExists(directory)
      .then((stat) => {
        if (stat === false) {
          const fileNames = fs.readdirSync(directory);
          if (fileNames.length === 0) {
            reject(new Error(`\nLa ruta ${directory} está vacía ❎\n`.red));
          } else {
            resolve(fileNames);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

function completePaths(directory) {
  return new Promise((resolve, reject) => {
    extractFiles(directory)
      .then((fileNames) => {
        const completePaths = fileNames.map((incompletePath) => path.join(directory, incompletePath));
        console.log("\nEstos son los archivos encontrados:\n".rainbow, fileNames);
        resolve(completePaths);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

completePaths("prueba")
  .then((files) => {
    files.forEach((file => {
      resolvingPath(file)
      .then((links) => {
        console.log(links);
        return links;
      })
      .catch((error) => {
        console.error(error);
      })
    }))
  })
  .catch((error) => {
    console.error(error);
  });
