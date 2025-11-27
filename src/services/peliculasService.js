import axios from 'axios'

const API_URL = 'https://api.sampleapis.com/movies/animation'

export const obtenerPeliculas = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error al obtener películas:', error)
    throw error
  }
}
