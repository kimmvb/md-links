const colors = require("colors");
const fs = require("fs");
const path = require("path");
const fileExists = require("./fileExists");

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
        resolve(completePaths);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

completePaths("prueba")
  .then((files) => {
    console.log("\nEstos son los archivos encontrados:\n".rainbow, files);
  })
  .catch((error) => {
    console.error(error);
  });
