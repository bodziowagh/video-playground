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

function renderFrame() {
  canvas.drawImage(video, 0, 0, FRAME_WIDTH, FRAME_HEIGHT)
  const rawFrame = canvas.getImageData(0, 0, FRAME_WIDTH, FRAME_HEIGHT)

  const frame = invertColorsFilter(
    removeColorFilter(rawFrame, {
      color: {
        r: 230,
        g: 170,
        b: 100
      },
      tolerance: 50
    }
  ))

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
