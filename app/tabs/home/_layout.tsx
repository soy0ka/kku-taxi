import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '메인', headerShown: false }} />
      <Stack.Screen name="create" options={{ title: '방 만들기' }} />
    </Stack>
  )
}
