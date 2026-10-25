import apiClient from './client'

// Todas las categorías (con imagen)
export async function getCategories() {
  const response = await apiClient.get('categories.php')
  return response.data.categories ?? []
}

// Comidas de una categoría (datos resumidos: id, nombre e imagen)
export async function getMealsByCategory(category) {
  const response = await apiClient.get('filter.php', { params: { c: category } })
  return response.data.meals ?? []
}

// Buscar comidas por nombre
export async function searchMeals(name) {
  const response = await apiClient.get('search.php', { params: { s: name } })
  return response.data.meals ?? []
}

// Detalle completo de una comida
export async function getMealById(id) {
  const response = await apiClient.get('lookup.php', { params: { i: id } })
  return response.data.meals ? response.data.meals[0] : null
}

// Una comida aleatoria
export async function getRandomMeal() {
  const response = await apiClient.get('random.php')
  return response.data.meals[0]
}
