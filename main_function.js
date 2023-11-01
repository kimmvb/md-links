const pathExistsAndType = require("./src/path_exists_and_type");
const validateLinks = require("./src/validate");

/**
 * This function extracts the links from a markdown file and validate those links.
 * @param {String} path Path from a file or a directory (absolute or relative)
 * @param {String} [validate] If the argument is 'true', it validates the links. Else if it is false or undefined, the links will not be validated.
 * @returns {Promise} Returns a promise with an array of links (validated or not) if it is resolved or an error if it is rejected
 */
function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    pathExistsAndType(path)
      .then((links) => {
        //If the argument is 'true', the links will be validated
        //If the argument is not 'true', the links will not be validated
        if (validate === "true") {
          validateLinks(links)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(links); 
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = mdLinks;
