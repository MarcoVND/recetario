import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategories, getRandomMeal } from '../api/meals'
import SearchBar from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import Loading from '../components/Loading'
import Message from '../components/Message'

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  // Cargar las categorías al abrir la pantalla
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError('No se pudieron cargar las categorías'))
      .finally(() => setLoading(false))
  }, [])

  // Al buscar, mandamos el texto a la pantalla de comidas
  const handleSearch = () => {
    if (!search.trim()) return
    navigation.navigate('Meals', { search: search.trim() })
  }

  const handleRandom = async () => {
    try {
      const meal = await getRandomMeal()
      navigation.navigate('MealDetail', { id: meal.idMeal })
    } catch {
      setError('No se pudo obtener una comida aleatoria')
    }
  }

  if (loading) return <Loading />

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} onSubmit={handleSearch} />

      <Pressable style={styles.randomButton} onPress={handleRandom}>
        <Text style={styles.randomText}>🎲 Comida aleatoria</Text>
      </Pressable>

      {error && <Message text={error} />}

      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => navigation.navigate('Meals', { category: item.strCategory })}
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
  randomButton: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#e67e22',
    borderRadius: 10,
    alignItems: 'center',
  },
  randomText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
})

export default HomeScreen
