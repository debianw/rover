#!/usr/bin/env node
const yargs = require('yargs/yargs');
// const { roverIterator } = require('@rover/core/rover');

;(async () => {
  const argv = yargs(process.argv.slice(2))
    .option('index', {
      alias: 'x',
      describe: "Display X image"
    })
    .option('slide', {
      // alias: 's',
      describe: "Display Slide Show"
    })
    .option('speed', {
      alias: 's',
      describe: "Slideshow speed in ms",
    })
    .help().argv;

    console.log(argv);
})();