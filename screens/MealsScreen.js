import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMealsByCategory, searchMeals } from '../api/meals'
import SearchBar from '../components/SearchBar'
import MealCard from '../components/MealCard'
import Loading from '../components/Loading'
import Message from '../components/Message'

// Esta pantalla recibe una categoría (desde una tarjeta)
// o un texto de búsqueda (desde el buscador de la home)
const MealsScreen = ({ route, navigation }) => {
  const { category, search: initialSearch } = route.params

  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Título de la barra superior
    navigation.setOptions({ title: category ?? `"${initialSearch}"` })

    const request = category ? getMealsByCategory(category) : searchMeals(initialSearch)

    request
      .then(setMeals)
      .catch(() => setError('No se pudieron cargar las comidas'))
      .finally(() => setLoading(false))
  }, [category, initialSearch])

  // Filtramos la lista mientras el usuario escribe
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <Loading />

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Filtrar comidas..." />

      {error && <Message text={error} />}

      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.list}
        ListEmptyComponent={!error && <Message text="No se encontraron comidas" />}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetail', { id: item.idMeal })}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingBottom: 16,
  },
})

export default MealsScreen
