import axios from "axios"

// La API key de prueba ("1") va dentro de la ruta
const apiClient = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiClient
