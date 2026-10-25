// La API trae los ingredientes en 20 campos separados
// (strIngredient1...20 y strMeasure1...20). Aquí los juntamos en un arreglo.
export function getIngredients(meal) {
  const list = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      list.push({ ingredient: ingredient.trim(), measure: (measure || '').trim() })
    }
  }

  return list
}
