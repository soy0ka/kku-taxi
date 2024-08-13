import { ChatRoom } from '@/types/chatrooms'
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
  Text,
  VStack
} from '@gluestack-ui/themed'
import { router } from 'expo-router'

import React from 'react'
interface PressableChatroomCardProps {
  room: ChatRoom
}
export const PressableChatroomCard: React.FC<PressableChatroomCardProps> = ({
  room
}) => {
  return (
    room.Party[0] && (
      <Pressable
        onPress={() => router.push(`/tabs/chat/chatroom?id=${room.id}`)}
        mt={10}
      >
        <Card>
          <HStack style={{ alignItems: 'center' }}>
            <Avatar size="md" borderRadius="$full" bgColor="#036B3F">
              <AvatarFallbackText>{room.name}</AvatarFallbackText>
              <AvatarImage source={{ uri: Profile(room.id) }} alt={room.name} />
            </Avatar>
            <VStack ml={10}>
              <Heading size="md">{room.name}</Heading>
              <Text size="md">
                {room.Party[0].fromPlace.name} - {room.Party[0].toPlace.name}
              </Text>
            </VStack>
          </HStack>
          <Text size="sm">
            {formatDateToKorean(room.Party[0].departure)} 출발
          </Text>
        </Card>
      </Pressable>
    )
  )
}
