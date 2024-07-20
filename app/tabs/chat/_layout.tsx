import { Icon, MenuIcon } from '@gluestack-ui/themed'
import { Stack } from 'expo-router'
import React from 'react'

export default function Layout() {
  // headerright 에 설정 버튼 추가
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: '채팅', headerShown: false }}
      />
      <Stack.Screen
        name="chatroom"
        options={{
          title: '채팅방',
          headerRight: () => (
            <Icon as={MenuIcon} m="$0" w="$6" h="$6" />
          ),
        }}
      />
    </Stack>
  )
}
