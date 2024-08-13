import { PressableChatroomCard } from '@/components/chat/pressableChatroomCard'
import { ChatRoom } from '@/types/chatrooms'
import { fetcher } from '@/utils/apiClient'
import { SafeAreaView, ScrollView, Text } from '@gluestack-ui/themed'
import { useNavigation } from 'expo-router'
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
    setChatRooms(res.data)
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }} mt={10}>
        {chatRooms && chatRooms.length ? (
          chatRooms?.map((room, i) => (
            <PressableChatroomCard key={i} room={room} />
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
