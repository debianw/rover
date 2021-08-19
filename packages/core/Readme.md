# Core

## Termrover Wrapper Usage

### Fetch termrover info 

```js
  const rover = require('@rover/core/rover');
  const info = await rover.fetchTermRoverInfo();
```

### Fetch last image

```js
  const rover = require('@rover/core/rover');
  const image = await rover.fetchLastImage();
```

### Fetch image by index 

```js
  const rover = require('@rover/core/rover');
  const image = await rover.fetchImageByIndex(1);

  if (image === null) console.log("Image not found");
```

### Async image iterator 

```js
  const { roverIterator } = require('@rover/core/rover');
  const imageIterator = roverIterator()[Symbol.asyncIterator]();
  const { done, value: image_1 } = await imageIterator.next();
  const { done, value: image_2 } = await imageIterator.next();
  const { done, value: image_3 } = await imageIterator.next();
```

## API

### fetchTermRoverInfo()
Fetch termrover API information: (numImages, key)
```js
  rover.fetchLastImage();
```

### fetchLastImage()
Fetches the last image of the termrover API
```js
  rover.fetchLastImage();
```

### fetchImageByIndex(index)
Fetch single image by index from termrover API
```js
  rover.fetchImageByIndex();
```

### roverIterator(index)
Iterate through rover images
```js
  const iterator = rover.roverIterator();
  for await (const image of iterator) {
    console.log(image);
  }
```

## License

[MIT](LICENSE)