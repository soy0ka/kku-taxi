import React from 'react'
import styles from '../../styles'
import {
  Avatar,
  AvatarFallbackText,
  Card,
  Heading,
  HStack,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
} from '@gluestack-ui/themed'
import { router, useNavigation } from 'expo-router'
import { fetcher } from '../../util'

export default function ChatRooms() {
  const [chatRooms, setChatRooms] = React.useState<any[]>([])
  const navigation = useNavigation()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChatRooms()
    })

    return unsubscribe
  }, [navigation])

  const fetchChatRooms = async () => {
    const res = await fetcher('/chat/me')
    if (!res) return
    setChatRooms(res)
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }} mt={10}>
        {chatRooms?.map((room, i) => (
          <Pressable onPress={() => router.push(`/tabs/chat/chatroom?id=${room.id}`)} key={i} mt={10}>
            <Card>
              <HStack style={{ alignItems: 'center' }}>
                <Avatar size="md" borderRadius="$full" bgColor='#036B3F'>
                  <AvatarFallbackText>{room.name}</AvatarFallbackText>
                </Avatar>
                <Heading ml={10} size="lg">
                  {room.name}
                </Heading>
              </HStack>
              <Text size="sm">2024-05-28 | 건국대학교정문 - 충주역</Text>
              <Text size="sm">총 인원: 4명</Text>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
