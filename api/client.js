import axios from "axios"

const apiClient = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiClient