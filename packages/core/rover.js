const axios = require("axios");
const config = require("./config");

/**
 * Fetch latest image
 *
 * @returns
 */
exports.fetchLastImage = async () => {
  try {
    const response = await axios.get(`${config.api}/latest`);
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Fetch an image by index
 */
const fetchImageByIndex = async (idx) => {
  try {
    const response = await axios.get(`${config.api}/${idx}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

exports.fetchImageByIndex = fetchImageByIndex;

/**
 * @returns Async Iterator
 */
exports.roverIterator = () => {
  const imageIterator = {
    [Symbol.asyncIterator]() {
      return {
        idx: 1,
        async next() {
          const image = await fetchImageByIndex(this.idx);
          if (!image) {
            return { done: true, value: image };
          }

          this.idx++;

          return {
            value: image,
            done: false,
          }
        },
      };
    },
  };

  return imageIterator;
};
