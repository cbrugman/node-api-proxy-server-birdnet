const birdDisplay = document.querySelector('.birds')
const birdForm = document.querySelector('#bird-form')
const birdweatherInput = document.querySelector('#city-input')

// Fetch weather data from API
const detectBirds = async (APIrequest) => {
    
  const url = `/api?q=${APIrequest}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert('Invalid API Key')
    return
  }
  
  const displayData = {
    species: data.species,
    detections: data.detections, 
  }

  addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = (data) => {
  birdDisplay.innerHTML = `
    <h1>${data.species} species in</h1>
    <h2>${data.detections} detections.</h2>
  `
  birdweatherInput.value = ''
}

// Event listener for form submission
birdForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (birdweatherInput.value === '') {
    alert('Please enter a city')
  } else {
    detectBirds(birdweatherInput.value)
  }
})

// Initial fetch
detectBirds('stats')
