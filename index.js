const RENDER_FREQUENCY = 16
const FRAME_WIDTH = 400
const FRAME_HEIGHT = 400

const video = document
  .getElementById('video-container')
const canvas = document
  .getElementById('modified-video-container')
  .getContext("2d")

function startRenderLoop() {
  setInterval(renderFrame, RENDER_FREQUENCY)
}

const invertColorsFilter = (frame) => {
  const l = frame.data.length / 4
  
  for (let i = 0; i < l; i++) {
    const r = frame.data[i * 4] 
    const g = frame.data[(i * 4) + 1] 
    const b = frame.data[(i * 4) + 2] 

    frame.data[i * 4] = 255 - r
    frame.data[(i * 4) + 1] = 255 - g
    frame.data[(i * 4) + 2] = 255 - b
  }

  return frame
}

function renderFrame() {
  canvas.drawImage(video, 0, 0, FRAME_WIDTH, FRAME_HEIGHT)
  const rawFrame = canvas.getImageData(0, 0, FRAME_WIDTH, FRAME_HEIGHT)

  const frame = invertColorsFilter(rawFrame)

  canvas.putImageData(frame, 0, 0)
}

async function initVideo() {
  try {
    const videoStream = await navigator.mediaDevices.getUserMedia({ 
      audio: false,
      video: {
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT
      }
    })

    video.srcObject = videoStream
    video.addEventListener("play", startRenderLoop)
    
  } catch (error) {
    console.error(error)
  }
}

initVideo()
