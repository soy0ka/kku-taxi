// import { Message } from '@/types/messages';
import { Message } from '@/types/message'
import { poster } from '@/utils/apiClient'
import { getTextId } from '@/utils/getTextId'
import { Profile } from '@/utils/gravatar'
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Heading,
  HStack,
  LinkText,
  ScrollView,
  Text,
  VStack
} from '@gluestack-ui/themed'
import React from 'react'
import { AlertRef } from '../alert'

interface MessageListProps {
  messages: Message[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollViewRef: React.RefObject<any>
  alertRef: React.RefObject<AlertRef>
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  scrollViewRef,
  alertRef
}) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
    >
      {!messages.length && (
        <Box style={{ alignItems: 'center', marginTop: 20 }}>
          <Text>아직 아무도 대화를 시작하지 않았군요</Text>
          <Text>가장 처음으로 안녕이라고 인사해보는건 어떤가요?</Text>
        </Box>
      )}
      {messages.map((message, i) => (
        <Box
          key={i}
          style={{
            padding: 10,
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            marginBottom: 10
          }}
        >
          {message.isSystem ? (
            <Box style={{ alignItems: 'center' }}>
              <Text style={{ color: '#666' }}>{message.content}</Text>
            </Box>
          ) : (
            <React.Fragment>
              <HStack space="md">
                <Avatar bgColor="$indigo600">
                  <AvatarFallbackText>{message.sender.name}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: Profile(getTextId(message.sender.email))
                    }}
                    alt={`${message.sender.name}의 프로필사진`}
                  />
                </Avatar>
                <VStack>
                  <HStack style={{ alignItems: 'center' }}>
                    <Heading size="sm">{message.sender.name}</Heading>
                    <Text
                      style={{ color: '#666', marginLeft: 5 }}
                      fontSize={12}
                    >
                      @{getTextId(message.sender.email)}
                    </Text>
                  </HStack>
                  <Text size="sm">{message.content}</Text>
                </VStack>
                <LinkText
                  style={{ fontSize: 12, marginLeft: 'auto' }}
                  onPress={() => {
                    poster('/chat/report', {
                      id: message.id,
                      reason: 'unset'
                    })
                    alertRef.current?.openAlert(
                      '신고가 접수되었습니다.',
                      `@${getTextId(message.sender.email)}: ${message.content} `
                    )
                  }}
                >
                  신고
                </LinkText>
              </HStack>
              <Text style={{ color: '#666', fontSize: 12, marginLeft: 'auto' }}>
                {new Date(message.createdAt).toLocaleString()}
              </Text>
            </React.Fragment>
          )}
        </Box>
      ))}
    </ScrollView>
  )
}

export default MessageList
