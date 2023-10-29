require("colors");
const path = require("path");
const { findLinks } = require("./find_links");

/**
 *This function recieves a path, identifies if it is absolute or relative and transforms if it is neccesary. Then, it checks if the file from the path has a markdown extension or not.
 * @param {String} paths Path from a file (absolute or relative)
 * @returns {Promise} Returns a promise with an array of links if it is resolved or an error if it is rejected
 */
function checkPath(paths) {
  return new Promise((resolve, reject) => {
    //Variable the path in its absolute form.
    let absolutePath = "";

    //If the path is relative, it is transform to absolute.
    //If the path is absolute, it stays the same.
    if (!path.isAbsolute(paths)) {
      const pathToAbsolute = path.resolve(__dirname, paths);
      absolutePath = pathToAbsolute;
      console.log(
        `\nThe path '${paths}' is not absolute ❎  Transforming to absolute 🛠️`
          .yellow
      );
    } else {
      absolutePath = paths;
      console.log(`\nThe path '${paths}' is absolute ✅`.green);
    }

    //Once the path was transformed to absolute, it is checked...
    //If the file has a markdown extension or not.
    //If the file does not have an markdown extension, the promise is rejected with an error.
    //Else if the file is markdown the path passes as an argument for the promise 'findLinks'...
    ////finally the promise is resolved with an array with links
    if (
      !/\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/i.test(
        path.extname(absolutePath)
      )
      //.test(): tests for a match in a string. If it finds a match, it returns true, otherwise it returns false.
    ) {
      reject(
        new Error(`\nThe file '${absolutePath}' is not markdown! ❎\n`.red)
      );
      return;
    } else {
      console.log(`\nThe file '${absolutePath}' is markdown! ✅`.green);
      findLinks(absolutePath)
        .then((links) => {
          resolve(links);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

module.exports = checkPath;
