import { Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const MealCard = ({ meal, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* "/small" pide una versión ligera de la imagen */}
      <Image source={{ uri: `${meal.strMealThumb}/small` }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{meal.strMeal}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  name: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
})

export default MealCard
