import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import * as Notifications from 'expo-notifications'
import { Stack } from 'expo-router/stack'
import React from 'react'
import { Platform } from 'react-native'
import { AlertRef } from '../components/alert'
import { poster } from './util'

export default function Layout() {
  registerToken()
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

async function registerToken() {
  const token = await registerForPushNotificationsAsync()
  console.log('token', token)
  await poster('/auth/notification', { token })
}

async function registerForPushNotificationsAsync() {
  const alertRef = React.useRef<AlertRef>(null)
  let token
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    return alert('Failed to get push token for push notification!')
  }
  token = (await Notifications.getExpoPushTokenAsync()).data

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  } else if (Platform.OS === 'ios') {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    })
  }

  return token
}
