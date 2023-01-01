const firePixelsArray = []
      fireWidth = 40
      fireHeight = 40
      debug = false
      fireColorsPalette = [{"r":0,"g":12,"b":16},{"r":0,"g":18,"b":24},{"r":0,"g":30,"b":40},
      {"r":0,"g":37,"b":48},{"r":1,"g":49,"b":64},{"r":1,"g":55,"b":72},{"r":1,"g":67,"b":88},
      {"r":1,"g":74,"b":96},{"r":2,"g":86,"b":112},{"r":2,"g":92,"b":120},{"r":2,"g":104,"b":136},
      {"r":2,"g":111,"b":144},{"r":3,"g":123,"b":160},{"r":3,"g":129,"b":168},{"r":3,"g":141,"b":184},
      {"r":3,"g":148,"b":192},{"r":4,"g":160,"b":208},{"r":4,"g":166,"b":216},{"r":4,"g":178,"b":232},
      {"r":4,"g":185,"b":240},{"r":10,"g":194,"b":250},{"r":18,"g":196,"b":250},{"r":34,"g":200,"b":250},
      {"r":42,"g":202,"b":250},{"r":58,"g":206,"b":251},{"r":66,"g":208,"b":251},{"r":82,"g":212,"b":251},
      {"r":90,"g":214,"b":251},{"r":106,"g":218,"b":252},{"r":114,"g":220,"b":252},{"r":130,"g":224,"b":252},
      {"r":138,"g":226,"b":252},{"r":154,"g":230,"b":253},{"r":162,"g":232,"b":253},{"r":178,"g":236,"b":253},
      {"r":186,"g":238,"b":253},{"r":218,"g":246,"b":254}]
      
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