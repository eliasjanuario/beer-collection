const API_URL = 'https://api.punkapi.com/v2/beers'

export async function getAllBeers(page = 1, pageSize = 15) {
  try {
    const response = await fetch(`${API_URL}?page=${page}&per_page=${pageSize}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error Fetching Beers:', error)
    throw error
  }
}

export async function postBeerImage(formData) {
  try {
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })
    return response
  } catch (error) {
    console.error('Error Handling Image:', error)
    throw error
  }
}
