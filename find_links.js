const fs = require("fs");

/**
 * This function reads the file from a specific path and extract its data.
 * @param {String} paths Path from a file 
 * @returns {Promise} Returns a promise with the data if it is resolved or an error if it is rejected.
 */
function readingFile(paths) {
  return new Promise((resolve, reject) => {
    fs.readFile(paths, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(`\nThe file '${paths}' is being read (this may take a few minutes)... 🕒`.yellow);
        resolve(data);
      }
    });
  });
}

/**
 * This function finds and saves the links from a file.
 * @param {String} paths Path from a file
 * @returns Returns a promise with an array of links if it is resolved or an error if it is rejected.
 */
function findLinks(paths) {
  return new Promise((resolve, reject) => {
    readingFile(paths)
      .then((data) => {
        const fileContent = data;
        const findLinksRE = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
        const links = [];
        let match;

        //While there are matches, every match will be added to the empty array 'links'. 
        while ((match = findLinksRE.exec(fileContent)) !== null) {
          links.push({
            text: match[1],
            url: match[2],
            file: paths,
          });
        }

        //If the array of links is empty (equals 0), the promise will be rejected
        //But if there are links, the promise will be resolved with the array of links
        if (links.length === 0) {
          reject(
            new Error(
              `\nThere was not a single link inside the file '${paths}' ❎\n`.red
            )
          );
        } else {
          resolve(links);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = { readingFile, findLinks };
