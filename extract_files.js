require("colors");
const fs = require("fs");
const path = require("path");
const checkPath = require("./check_path");

/**
 * This function extracts the files' names from a directory path.
 * @param {String} directory Path from a directory
 * @returns {Promise} Returns a promise with an array of files' names if it is resolved or an error if it is rejected (without files)
 */
function extractFiles(directory) {
  return new Promise((resolve, reject) => {
    const fileNames = fs.readdirSync(directory);
    if (fileNames.length === 0) {
      reject(
        new Error(
          `\nThere are not files inside the path '${directory}' ❎\n`.red
        )
      );
    } else {
      resolve(fileNames);
    }
  });
}

/**
 * This function completes paths' names and extracts links from every single file.
 * @param {String} directory Path from a directory
 * @returns {Promise} Returns a promise with an array of links of each file if it is resolved or an error if it is rejected
 */
function completePathsExtractLinks(directory) {
  return new Promise((resolve, reject) => {
    extractFiles(directory)
      .then((fileNames) => {
        //map(): creates a new array from calling a function for every array element.
        const allPaths = fileNames.map((incompletePath) =>
          path.join(directory, incompletePath)
        );
        console.log(
          "\nFiles found:\n".rainbow,
          allPaths
        );
      
        const linkPromises = allPaths.map((route) =>
          checkPath(route)
            .then((links) => {
              return links;
            })
            .catch((error) => {
              console.error(error);
              return error;
            })
        );

        resolve(Promise.all(linkPromises));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = completePathsExtractLinks;
