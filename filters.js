const invertColorsFilter = (frame) => {
  const l = frame.data.length
  
  for (let i = 0; i < l; i += 4) {
    const r = frame.data[i] 
    const g = frame.data[i + 1] 
    const b = frame.data[i + 2] 

    frame.data[i] = 255 - r
    frame.data[i + 1] = 255 - g
    frame.data[i + 2] = 255 - b
  }

  return frame
}

/* 
 * options:
 *   - color: {
 *      r: number, 
 *      g: number, 
 *      b: number, 
 *    }
 *   - tolerance: number  
*/
const removeColorFilter = (frame, options) => {
  const { color, tolerance } = options
  const l = frame.data.length
  
  for (let i = 0; i < l; i += 4) {
    const r = frame.data[i] 
    const g = frame.data[i + 1] 
    const b = frame.data[i + 2] 

    if (
      r >= color.r - tolerance && r <= color.r + tolerance && 
      g >= color.g - tolerance && g <= color.g + tolerance && 
      b >= color.b - tolerance && b <= color.b + tolerance
    ) {
      frame.data[i + 3] = 0
    }
  }

  return frame
}
