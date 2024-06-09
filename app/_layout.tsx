import React from 'react'
import Styles from './styles'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { Stack } from 'expo-router/stack'
import { config } from '@gluestack-ui/config'
import * as Notifications from 'expo-notifications'
import { GluestackUIProvider } from '@gluestack-ui/themed'

export default function Layout() {
  const [expoPushToken, setExpoPushToken] = React.useState<string | undefined>('')
  const [notification, setNotification] = React.useState<Notifications.Notification | null>(null)
  const notificationListener = React.useRef<Notifications.Subscription>()
  const responseListener = React.useRef<Notifications.Subscription>()

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  })

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => { setExpoPushToken(token) })
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
			if(typeof notificationListener.current !== 'undefined' && typeof responseListener.current !== 'undefined'){
				Notifications.removeNotificationSubscription(notificationListener.current)
				Notifications.removeNotificationSubscription(responseListener.current)
			}
    }
  }, [])

  React.useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('알림을 비활성화 하시면 중요한 채팅 알림을 받을 수 없습니다.')
      }
    })()
  }, [])

  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: '로그인' }} />
        <Stack.Screen name="authcode" options={{ title: '인증코드 입력' }}/>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  )
}

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice) {
    // Notification permissions request
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('푸시 알림은 실제 기기에서만 사용할 수 있습니다.')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}