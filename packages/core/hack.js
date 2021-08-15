const { fetchLastImage } = require('./rover');

;(async () => {
  const image = await fetchLastImage();

  console.log('=>>>> ', image);
})();