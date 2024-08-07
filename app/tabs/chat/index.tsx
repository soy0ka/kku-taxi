import { ChatRoom } from '@/types/chatrooms'
import { fetcher } from '@/utils/apiClient'
import { formatDateToKorean } from '@/utils/dateFormatter'
import { Profile } from '@/utils/gravatar'
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
    const res = await fetcher('/chat/@me')
    if (!res) return
    setChatRooms(res.data.chatrooms)
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }} mt={10}>
        {chatRooms && chatRooms.length ? (
          chatRooms?.map((room, i) => (
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
                      {room.Party[0].fromPlace.name} -{' '}
                      {room.Party[0].toPlace.name}
                    </Text>
                  </VStack>
                </HStack>
                <Text size="sm">
                  {formatDateToKorean(room.Party[0].departure)} 출발
                </Text>
              </Card>
            </Pressable>
          ))
        ) : (
          <Text style={{ textAlign: 'center' }}>
            아직 참여중인 채팅방이 없습니다.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
