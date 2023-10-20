const mdLinks = require("./index");

const path = process.argv[2]; // El primer argumento después de "node md-links.js" será la ruta del archivo a analizar.

if (path) {
  mdLinks(path)
  .then((links) => {
    if (Array.isArray(links)) {
      console.log("Enlaces encontrados:\n".rainbow, links);
    }
  })
  .catch((error) => {
      console.error(error)
    }); 
} else {
  console.error(
    "\nPor favor, proporciona la ruta de un archivo Markdown como argumento❗\n"
      .red
  );
}
