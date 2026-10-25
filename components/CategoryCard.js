import { Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const CategoryCard = ({ category, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: category.strCategoryThumb }} style={styles.image} />
      <Text style={styles.name}>{category.strCategory}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
})

export default CategoryCard
