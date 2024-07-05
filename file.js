const fs = require("fs");
const readline = require("readline");

const getLineCounter = (
  (i = 0) =>
  () =>
    ++i
)();

function readFile(pathToFile, onReadLine) {
  return new Promise(function (resolve, reject) {
    var rl = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });

    rl.on("line", function (line, lineNumber = getLineCounter()) {
      onReadLine(line, lineNumber);
    });

    rl.on("close", function () {
      resolve();
    });
  });
}

function writeFile(pathToFile, data) {
  return new Promise(function (resolve, reject) {
    fs.appendFile(pathToFile, data, "utf8", function (err) {
      if (err) {
        reject("Writing file error!");
      } else {
        resolve("Writing file succeeded!");
      }
    });
  });
}

async function deleteFile(filePath) {
  try {
    const isFileExists = await fileExists(filePath);
    if (isFileExists) {
      await fs.promises.unlink(filePath);
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function fileExists(path) {
  return !!(await fs.promises.stat(path).catch((e) => false));
}

async function removeDirectory(pathToDirectory) {
  try {
    await fs.promises.access(pathToDirectory, fs.constants.F_OK);
  } catch (e) {
    await fs.promises.rmdir(pathToDirectory);
  }
}

module.exports = {
  readFile,
  writeFile,
  deleteFile,
  fileExists,
  removeDirectory,
};
