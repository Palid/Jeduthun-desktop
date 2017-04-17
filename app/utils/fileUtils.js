/**
 * Promise based download file method
 */
const request = require('request')
const fs = require('fs')
const path = require('path')
const { Pully, Presets } = require('pully')

const LIBRARY_PATH = './library/'

function fileDownload(configuration) {
  console.log(configuration)

  return new Promise(function(resolve, reject) {
    const pully = new Pully()

    const options = {
      url: configuration.remoteFile,
      dir: './library',
      template: '${title}',
      preset: Presets.MP3,
      info: (format, cancel) => {
        console.log('Verify: ' + format.info.downloadSize);

        // Limit download to ~3MB...    
        if (format.info.downloadSize > 3000000) {
          cancel();
        }
      },
      progress: (data) => {
        if (data.indeterminate) {
          console.log(`[${new Date().toUTCString()}] Working...`);
        } else {
          console.log(`Progress: ${data.percent}%`);
          configuration.onProgress(data.percent)
        }
      }
    };

    pully.download(options)
    .then((results) => {
      console.log(`Download Complete: "${results.path}"`);
      resolve()
    }, err => {
      console.error('Uh oh!', err);
      resolve()
    });
  })
}

function ytDurationToStr(ytDuration) {
  let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
  let hours = 0, minutes = 0, seconds = 0, totalseconds

  if (reptms.test(ytDuration)) {
    let matches = reptms.exec(ytDuration)
    if (matches[1]) hours = Number(matches[1])
    if (matches[2]) minutes = Number(matches[2])
    if (matches[3]) seconds = Number(matches[3])
    totalseconds = hours * 3600  + minutes * 60 + seconds
  }

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`
  } else {
    let secondsOutput = String(seconds)
    if(secondsOutput.length === 1){
      secondsOutput = '0' + secondsOutput
    }
    return `${minutes}:${secondsOutput}`
  }
}

function parseJSON(response) {
  return response.json()
}

function getYtLength(id, key) {
  return fetch(`https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails&id=${id}&key=${key}`)
  .then(parseJSON)
  .then(function(body){
    return ytDurationToStr(body.items[0].contentDetails.duration)
  })
  .catch(err => console.error(err.message))
}

const getAppRoutePath = _ => path.resolve(path.dirname(global.require.main.filename), '../')

const getAudioPath = audioPath => path.resolve(getAppRoutePath(), LIBRARY_PATH, audioPath)

export default {
  fileDownload,
  getAppRoutePath,
  getAudioPath,
  getYtLength
}
