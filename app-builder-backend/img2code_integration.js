const { execFile } = require('child_process');
const path = require('path');

// This function calls the img2code Python script and returns the UI description/code
async function img2code(imagePath) {
  const scriptPath = path.resolve(__dirname, '../img2code/predict.py');
  const modelPath = path.resolve(__dirname, '../img2code/model.h5');
  return new Promise((resolve, reject) => {
    execFile('python3', [scriptPath, '--img_path', imagePath, '--model_path', modelPath], (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      // img2code outputs the UI code/description to stdout
      resolve(stdout.trim());
    });
  });
}

module.exports = { img2code };
