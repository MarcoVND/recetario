import { Text, StyleSheet } from 'react-native'
import React from 'react'

// Texto centrado para errores o listas vacías
const Message = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
  },
})

export default Message
