import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Card,
  Heading,
  HStack,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { router, useNavigation } from 'expo-router'
import React from 'react'
import { ChatRoom } from '../../../types/chatrooms'
import { fetcher, Profile } from '../../util'

export default function ChatRooms() {
  const [chatRooms, setChatRooms] = React.useState<ChatRoom[]>([])
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

  const formatTime = (date: string) => {
    const d = new Date(date)
    return `${d.getFullYear()}년 ${
      d.getMonth() + 1
    }월 ${d.getDate()}일 ${d.getHours()}:${d.getMinutes()}`
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }} mt={10}>
        {chatRooms?.map((room, i) => (
          <Pressable
            onPress={() => router.push(`/tabs/chat/chatroom?id=${room.id}`)}
            key={i}
            mt={10}
          >
            <Card>
              <HStack style={{ alignItems: 'center' }}>
                <Avatar size="md" borderRadius="$full" bgColor="#036B3F">
                  <AvatarFallbackText>{room.name}</AvatarFallbackText>
                  <AvatarImage
                    source={{ uri: Profile(room.id) }}
                    alt={room.name}
                  />
                </Avatar>
                <VStack ml={10}>
                  <Heading size="md">{room.name}</Heading>
                  <Text size="md">
                    {room.party.from.name} - {room.party.to.name}
                  </Text>
                </VStack>
              </HStack>
              <Text size="sm">{formatTime(room.party.departure)}</Text>
            </Card>
          </Pressable>
        ))}
        {!chatRooms.length && (
          <Text style={{ textAlign: 'center' }}>
            아직 참여중인 채팅방이 없습니다.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
