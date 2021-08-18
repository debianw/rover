# Rover Apps

## Install

```
yarn setup
```

## Termrover Wrapper Usage

### Fetch last image

```js
  const rover = require('@rover/core/rover');
  const image = rover.fetchLastImage();
```
### Fetch image by index 

```js
  const rover = require('@rover/core/rover');
  const image = rover.fetchImageByIndex(1);

  if (image === null) console.log("Image not found");
```

### Async image iterator 

```js
  const { roverIterator } = require('@rover/core/rover');
  const imageIterator = roverIterator()[Symbol.asyncIterator]();
  const image_1 = await imageIterator.next();
  const image_2 = await imageIterator.next();
  const image_3 = await imageIterator.next();
```