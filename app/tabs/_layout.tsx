import FontAwesome from '@expo/vector-icons/FontAwesome'
import * as Notifications from 'expo-notifications'
import { Tabs } from 'expo-router'
import React, { useEffect } from 'react'
import { Alert, Platform } from 'react-native'
import { poster } from '../util'

export default function TabLayout() {
  useEffect(() => {
    registerToken()
  }, [])

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#036B3F' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '메인',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: '채팅',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comment" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '마이페이지',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

async function registerToken() {
  const token = await registerForPushNotificationsAsync()
  if (token) {
    console.log('token', token)
    await poster('/auth/notification', { token })
  }
}

async function registerForPushNotificationsAsync() {
  let token
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Failed to get push token for push notification!')
    return
  }
  token = (await Notifications.getExpoPushTokenAsync()).data

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  return token
}
