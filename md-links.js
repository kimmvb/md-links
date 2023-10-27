const Table = require("cli-table3");
const mdLinks = require("./index");

const path = process.argv[2]; // El primer argumento después de "node md-links.js" será la ruta del archivo a analizar.
const validate = process.argv[3];

/* if (path) {
  mdLinks(path, validate)
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
*/
if (path) {
  mdLinks(path, validate)
    .then((links) => {
      //if (Array.isArray(links)) {
      const tableValidated = new Table({
        head: ["Text".red, "URL".yellow, "File".green, "Status".blue, "StatusText".magenta],
        colWidths: [20, 50, 50, 10, 15],
      });

      const tableNoValidated = new Table({
        head: ["Text".red, "URL".yellow, "File".green],
        colWidths: [20, 50, 50], 
      });

      links.forEach((item) => {
        if (item.status === undefined && item.statusText === undefined) {
          tableNoValidated.push([item.text, item.url, item.file]);
        } else {
          tableValidated.push([
            item.text,
            item.url,
            item.file,
            item.status,
            item.statusText,
          ]);
        }
      });

      if (validate === "true") {
        console.log("Enlaces validados:".rainbow);
        console.log(tableValidated.toString());
      } else {
        console.log("Enlaces no validados:".rainbow);
        console.log(tableNoValidated.toString());
      }
      //}
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.error(
    "\nPor favor, proporciona la ruta de un archivo Markdown como argumento❗\n"
      .red
  );
}
