import { Icon, MenuIcon } from '@gluestack-ui/themed'
import { Stack } from 'expo-router'
import React from 'react'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: '채팅', headerShown: false }}
      />
      <Stack.Screen
        name="finish"
        options={{ title: '운행 종료', headerShown: true }}
      />
      <Stack.Screen
        name="chatroom"
        options={{
          title: '채팅방',
          headerShown: true,
          headerRight: () => <Icon as={MenuIcon} m="$0" w="$6" h="$6" />
        }}
      />
    </Stack>
  )
}
