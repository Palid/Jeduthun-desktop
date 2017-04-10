/**
 * Promise based download file method
 */
const request = require('request')
const fs = require('fs')
const path = require('path')

const LIBRARY_PATH = './library/'

function fileDownload(configuration) {
  return new Promise(function (resolve, reject) {
    // Save variable to know progress
    let received_bytes = 0;
    let total_bytes = 0;

    let req = request({
      method: 'GET',
      uri: configuration.remoteFile
    });

    let out = fs.createWriteStream(configuration.localFile);
    req.pipe(out);

    req.on('response', function (data) {
      // Change the total bytes value to get progress later.
      total_bytes = parseInt(data.headers['content-length']);
    });

    // Get progress if callback exists
    if (configuration.hasOwnProperty("onProgress")) {
      req.on('data', function (chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        configuration.onProgress(received_bytes, total_bytes);
      });
    } else {
      req.on('data', function (chunk) {
        // Update the received bytes
        received_bytes += chunk.length;
      });
    }

    req.on('end', function () {
      resolve();
    });
  });
}

const getAppRoutePath = _ => path.resolve(path.dirname(global.require.main.filename), '../')

const getAudioPath = audioPath => path.resolve(getAppRoutePath(), LIBRARY_PATH, audioPath)

export default {
  fileDownload,
  getAppRoutePath,
  getAudioPath
}
