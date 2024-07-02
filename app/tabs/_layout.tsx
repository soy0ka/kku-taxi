import FontAwesome from '@expo/vector-icons/FontAwesome'
import * as Notifications from 'expo-notifications'
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { AlertRef } from '../../components/alert'
import { poster } from '../util'

export default function TabLayout() {
  registerToken()
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
