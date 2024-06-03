import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '채팅', headerShown: false }} />
      <Stack.Screen name="chatroom" options={{ title: '채팅방' }} />
    </Stack>
  )
}
