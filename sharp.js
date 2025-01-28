/* eslint-disable no-undef */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Compress and resize hero image for large screens
sharp(`${target}/hero-image.jpg`)
  .resize(1200, 800)
  .jpeg({ quality: 80 })
  .toFile(path.resolve(__dirname, `${destination}/hero-image-large.jpg`))
  .then((info) => { console.log('Large hero image generated:', info); })
  .catch((err) => { console.log('Error generating large hero image:', err); });

// Compress and resize hero image for small screens
sharp(`${target}/hero-image.jpg`)
  .resize(480, 320)
  .jpeg({ quality: 80 })
  .toFile(path.resolve(__dirname, `${destination}/hero-image-small.jpg`))
  .then((info) => { console.log('Small hero image generated:', info); })
  .catch((err) => { console.log('Error generating small hero image:', err); });