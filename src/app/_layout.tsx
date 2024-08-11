import { AlertProvider } from '@/contexts/AlertContext'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Stack } from 'expo-router/stack'
import { getApps, initializeApp } from 'firebase/app'
import React from 'react'

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Firebase 초기화 (이미 초기화된 경우 방지)
if (getApps().length === 0) {
  initializeApp(firebaseConfig)
}

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <AlertProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: '로그인' }}
          />
          <Stack.Screen name="authcode" options={{ title: '인증코드 입력' }} />
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
        </Stack>
      </AlertProvider>
    </GluestackUIProvider>
  )
}
