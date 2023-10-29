const Table = require("cli-table3");
const mdLinks = require("./main_function");

const path = process.argv[2]; //First argument after "node md-links.js" will be the file's path.
const validate = process.argv[3]; //Second argument will be optional, to validate ('true') or not the links in the file.

if (path) {
  mdLinks(path, validate)
    .then((links) => {
      //Console table for validated links
      const tableValidated = new Table({
        head: [
          "Text".red,
          "URL".yellow,
          "File".green,
          "Status".blue,
          "StatusText".magenta,
        ],
        colWidths: [20, 50, 50, 10, 15],
      });

      //Console table for unvalidated links
      const tableNoValidated = new Table({
        head: ["Text".red, "URL".yellow, "File".green],
        colWidths: [20, 50, 50],
      });

      //If the links do not have status the will be pushed to the unvalidated links table
      //But if they are validated, they will be pushed to the validated links table
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

      //And according to the validate argument one or the other will be shown in the console
      if (validate === "true") {
        console.log("\nValidated links:".rainbow);
        console.log(tableValidated.toString());
      } else {
        console.log("\nLinks:".rainbow);
        console.log(tableNoValidated.toString());
      }
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  //If there is not a path, the following error will be shown.
  console.error(
    "\nPlease, provide a Markdown file path or a directory path as an argument❗\n"
      .red
  );
}
