const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif', '.svg'];

// Function to process a single image
const processImage = async (sourcePath, targetPath, filename) => {
  try {
    // Create directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Process large image
    await sharp(sourcePath)
      .resize(800)
      .toFormat('jpeg')
      .toFile(path.resolve(
        targetDir,
        `${filename.split('.').slice(0, -1).join('.')}-large.jpg`
      ));

    // Process small image
    await sharp(sourcePath)
      .resize(480)
      .toFormat('jpeg')
      .toFile(path.resolve(
        targetDir,
        `${filename.split('.').slice(0, -1).join('.')}-small.jpg`
      ));

    console.log(`Successfully processed ${filename}`);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
};

// Function to process directory recursively
const processDirectory = (sourceDir, targetDir) => {
  fs.readdirSync(sourceDir, { withFileTypes: true }).forEach(dirent => {
    const sourcePath = path.join(sourceDir, dirent.name);
    const targetPath = path.join(targetDir, dirent.name);

    if (dirent.isDirectory()) {
      // If it's a directory, process it recursively
      processDirectory(sourcePath, targetPath);
    } else {
      // If it's a file, check if it's an image and process it
      const ext = path.extname(dirent.name).toLowerCase();
      if (supportedFormats.includes(ext)) {
        processImage(sourcePath, targetPath, dirent.name);
      } else {
        console.log(`Skipping ${dirent.name}: Unsupported format`);
      }
    }
  });
};

// Create destination root if it doesn't exist
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Start processing
processDirectory(target, destination);