//Se extraen los links (se almacenan en un array) (expresiones regulares)
//Función para encontrar links dentro de un archivo md
const fs = require("fs");

function findLinks(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("\nError: \n", err);
      } else {
        const fileContent = data;
        const findLinksRE = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
        const links = [];
        let match;

        while ((match = findLinksRE.exec(fileContent)) !== null) {
          links.push({
            text: match[1],
            url: match[2],
            file: filePath,
          });
        }
        if (links.length === 0) {
          reject(
            new Error(
              `\nNo se encontraron enlaces en el archivo: ${filePath} ❎\n`.red
            )
          );
        } else {
          resolve(links);
        }
      }
    });
  });
}

module.exports = findLinks;
