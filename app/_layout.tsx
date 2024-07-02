import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Stack } from 'expo-router/stack'
import React from 'react'

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: '로그인' }}
        />
        <Stack.Screen name="authcode" options={{ title: '인증코드 입력' }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  )
}
