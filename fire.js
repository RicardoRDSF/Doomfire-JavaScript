const firePixelsArray = []
      fireWidth = 40
      fireHeight = 40
      debug = false
      fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},
      {"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},
      {"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},
      {"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},
      {"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},
      {"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},
      {"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},
      {"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},
      {"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},
      {"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
      
function start(){
    createFireDataStructure()
    setInterval(calculateFirePropagation, 40)
}

function createFireDataStructure(){
    const numOfPixels = fireWidth * fireHeight
    for(i = 0;i < numOfPixels; i++){
        firePixelsArray[i] = 0
    }
}

function calculateFirePropagation(){
    for(let column = 0; column < fireWidth; column++){
        for(let row = 0; row < fireHeight; row++){
            const pixelIndex = column + (fireWidth * row)
            updateFireIntensityPerPixel(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex){
    const bellowPixelIndex = currentPixelIndex + fireWidth
    if (bellowPixelIndex >= fireWidth * fireHeight){
        return
    }
    const decay = Math.floor(Math.random() * 3)
          bellowPixelFireIntensity = firePixelsArray[bellowPixelIndex]
          newFireIntensity = bellowPixelFireIntensity - decay >= 0 ? bellowPixelFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}

function renderFire(){
    let html = '<table cellpadding=0 cellspacing0>'
    html += '<table>'
    for (let row = 0; row < fireHeight; row++){
        html += '<tr>'
        for (column = 0; column < fireWidth; column ++){
            const pixelIndex = column + (fireWidth * row)
                  fireIntensity = firePixelsArray[pixelIndex]
                  color = fireColorsPalette[fireIntensity]
                  colorString = `${color.r},${color.g},${color.b}`
            if(debug === true){
                html += `<td>${fireIntensity}`
                html += `<div class="pixel-index">${pixelIndex}`
            }else{
                html += '</td>'
                html+= `<td class="pixel" style="background-color: rgb(${colorString})"`
            }
            
        }
        html += '</tr>'
    }
    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource(){
    for (let column = 0; column <= fireWidth; column++){
        const overflowPixelIndex = fireWidth * fireHeight
              pixelIndex = (overflowPixelIndex - fireWidth) + column
        
        firePixelsArray[pixelIndex] = 36
    }
}

function destroyFireSource(){
    for(let column = 0; column <= fireWidth; column++){
        const overflowPixelIndex = fireWidth * fireHeight
              pixelIndex = (overflowPixelIndex - fireWidth) + column
        firePixelsArray[pixelIndex] = 0
    }
}

function increaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight
            pixelIndex = (overflowPixelIndex - fireWidth) + column
            currentFireIntensity = firePixelsArray[pixelIndex]
  
      if (currentFireIntensity < 36) {
        const increase = Math.floor(Math.random() * 14)
              newFireIntensity = currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase
  
        firePixelsArray[pixelIndex] = newFireIntensity
      }
    }
}

function decreaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight
            pixelIndex = (overflowPixelIndex - fireWidth) + column
            currentFireIntensity = firePixelsArray[pixelIndex]
  
      if (currentFireIntensity > 0) {
        const decay = Math.floor(Math.random() * 14)
              newFireIntensity = currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0
  
        firePixelsArray[pixelIndex] = newFireIntensity
      }
    }
}

function toggleDebugMode() {
    if (debug === false) {
      fireWidth = 10
      fireHeight = 10
      debug = true
    } else {
      fireWidth = 40
      fireHeight = 40
      debug = false
    }  
}

start ()