import React from 'react'
import styles from '../styles'
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed'
import { removeToken } from '../util'
import { router } from 'expo-router'

export default function Tab() {
  const handleLogout = () => {
    removeToken()
    router.push('/')
  }
  return (
    <Box style={styles.container}>
      <Text>Settings</Text>
      <Button onPress={() => {handleLogout()}}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </Box>
  )
}