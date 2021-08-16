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
exports.roverIterator = (skip = 0, limit) => {
  const imageIterator = {
    [Symbol.asyncIterator]() {
      return {
        idx: skip,
        async next() {
          if (limit > 0 && this.idx === skip + limit) {
            return { done: true, value: null, index: this.idx };
          }

          const image = await fetchImageByIndex(this.idx);
          if (!image) {
            return { done: true, value: image, index: this.idx };
          }


          this.idx++;

          return {
            index: this.idx,
            value: image,
            done: false,
          }
        },
      };
    },
  };

  return imageIterator;
};
