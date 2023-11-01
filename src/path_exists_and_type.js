require("colors");
const fs = require("fs");
const checkPath = require("./check_path");
const { completePathsExtractLinks } = require("./extract_files");

/**
 *This function receives a path and checks if exists or does not exists. If the path exists, checks if it belongs to a file or a directory.
 * @param {String} paths Path from a file or a directory (absolute or relative)
 * @returns {Promise} Returns a promise with an array of links if it is resolved or an error if it is rejected
 */
function pathExistsAndType(paths) {
  return new Promise((resolve, reject) => {
    //If the path does not exist, the promise is rejected and an error is thrown.
    //If the path exists, a console log is shown, indicating that the path exists.
    if (!fs.existsSync(paths)) {
      reject(
        new Error(
          `\nThe path '${paths}' is incorrect or does not exist ❎\n`.red
        )
      );
      return;
    } else {
      console.log(`\nThe path '${paths}' exists ✅`.green);
    }

    //Variable that saves the path's stats.
    const pathType = fs.statSync(paths);
    //If the path is a file or a directory, a confirmation console log is shown and...
    //the path passes as an argument for the promise 'checkingPath' or 'completePaths'...
    //finally the promise is resolved with an array with links or...
    //rejected with an error.
    if (pathType.isFile() === true) {
      console.log(`\nThe path ${paths} is from a file ✅`.green);
      checkPath(paths)
        .then((links) => {
          resolve(links);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (pathType.isDirectory() === true) {
      console.log(`\nThe path ${paths} is from a directory ✅`.green);
      completePathsExtractLinks(paths)
        .then((links) => {
          //flat(): Create a new array with the sub-array elements concatenated
          resolve(links.flat());
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      //Else if the paths is neither from a file or directory, the promise is rejected and an error is thrown.
      reject(
        new Error(
          `\nThe path '${paths}' is neither from a file or a directory ❎\n`.red
        )
      );
    }
  });
}

module.exports = pathExistsAndType;
