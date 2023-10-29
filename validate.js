const axios = require("axios");

/**
 * This function checks the status of every link given and add new information to the previous array with links.
 * @param {Array} links Array with links
 * @returns {Promise} Returns a promise with an array of validated links (status) if it is resolved or an error if it is rejected 
 */
function validateLinks(links) {
  return new Promise((resolve, reject) => {
    //Through axios, it is checked if the link is working or not.
    //If the link is either working or not, it is added new keys to it: status and statusText.
    //Explaining the status of each link.
    const promises = links.map((link) => {
      return axios
        .get(link.url)
        .then((res) => {
          link.status = res.status;
          link.statusText = res.statusText;
        })
        .catch((err) => {
          if (err.response) {
            link.status = err.response.status;
            link.statusText = err.response.statusText;
          }
        });
    });

    //Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
    Promise.all(promises)
      .then((links) => {
        resolve(links);
      })
      .catch((error) => {
        reject(error); // The promise is rejected if there are problems during the requests.
      });
  });
}


module.exports = validateLinks;
