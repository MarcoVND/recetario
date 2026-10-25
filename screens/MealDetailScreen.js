import { View, Text, Image, ScrollView, Pressable, Linking, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMealById } from '../api/meals'
import { getIngredients } from '../utils/getIngredients'
import Loading from '../components/Loading'
import Message from '../components/Message'

const MealDetailScreen = ({ route, navigation }) => {
  const { id } = route.params

  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getMealById(id)
      .then((data) => {
        setMeal(data)
        if (data) navigation.setOptions({ title: data.strMeal })
      })
      .catch(() => setError('No se pudo cargar la receta'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loading />
  if (error) return <Message text={error} />
  if (!meal) return <Message text="Receta no encontrada" />

  const ingredients = getIngredients(meal)

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.subtitle}>
          {meal.strCategory} · {meal.strArea}
        </Text>

        {meal.strTags && <Text style={styles.tags}>#{meal.strTags.split(',').join('  #')}</Text>}

        <Text style={styles.sectionTitle}>Ingredientes</Text>
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredient}>
            • {item.ingredient} {item.measure ? `— ${item.measure}` : ''}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Preparación</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>

        {meal.strYoutube ? (
          <Pressable style={styles.button} onPress={() => Linking.openURL(meal.strYoutube)}>
            <Text style={styles.buttonText}>▶ Ver video en YouTube</Text>
          </Pressable>
        ) : null}

        <Text style={styles.credits}>Datos de TheMealDB</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  tags: {
    marginTop: 8,
    color: '#e67e22',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#c4302b',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  credits: {
    marginTop: 24,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
})

export default MealDetailScreen
