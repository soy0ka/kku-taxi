import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Input,
  InputField,
  KeyboardAvoidingView,
  LinkText,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React from 'react'
import { Keyboard, Platform } from 'react-native'
import { io, Socket } from 'socket.io-client'
import { Alert } from '../../../components/alert'
import { userManager } from '../../../utils/localStorage'
import { fetcher, poster, Profile } from '../../util'

interface Message {
  id: number
  content: string
  isdeleted: boolean
  isSystem: boolean
  createdAt: string
  sender: {
    id: number
    name: string
    textId: string
  }
}

export default function Chatroom() {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()
  const alertRef = React.useRef<any>(null)
  const [user, setUser] = React.useState<any>({})
  const [value, setValue] = React.useState<string>('')
  const [messages, setMessages] = React.useState<Message[]>([])
  const [socket, setSocket] = React.useState<Socket | null>(null)
  const URL = process.env.EXPO_PUBLIC_WS_URL || 'http://localhost:3000'
  const scrollViewRef = React.useRef<any>(null)

  React.useEffect(() => {
    const ws = io(URL)
    setSocket(ws)
    ws.emit('joinRoom', id)
    fetchUser()
    setMessages([])
    const fetchMessages = async () => {
      const response = await fetcher(`/chat/room/${id}`)
      if (response) {
        setMessages(response)
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }, 100)
      }
    }
    fetchMessages()

    const unsubscribe = navigation.addListener('focus', fetchMessages)

    return () => {
      ws.disconnect()
      unsubscribe()
    }
  }, [navigation, id])

  React.useEffect(() => {
    if (!socket) return
    const messageHandler = (message: Message) => {
      setMessages((prev) => [...prev, message])
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }

    socket.on('messageCreate', messageHandler)

    return () => {
      socket.off('messageCreate', messageHandler)
    }
  }, [socket])

  const fetchUser = async () => {
    const user = await userManager.getUser()
    setUser(user)
  }

  const handleSend = async () => {
    if (!value) return
    const message = {
      content: value,
      senderId: user.id,
      roomId: id,
      sender: {
        id: user.id,
        name: user.name,
        textId: user.textId,
      },
    }
    socket?.emit('messageCreate', message)
    setValue('')
  }

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 90 })}
    >
      <Box style={{ flex: 1 }}>
        <Alert ref={alertRef} />
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
                marginBottom: 10,
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
                      <AvatarFallbackText>
                        {message.sender.name}
                      </AvatarFallbackText>
                      <AvatarImage
                        source={{ uri: Profile(message.sender.textId) }}
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
                          @{message.sender.textId}
                        </Text>
                      </HStack>
                      <Text size="sm">{message.content}</Text>
                    </VStack>
                    <LinkText
                      style={{ fontSize: 12, marginLeft: 'auto' }}
                      onPress={() => {
                        poster('/chat/report', {
                          id: message.id,
                          reason: 'unset',
                        })
                        alertRef.current?.openAlert(
                          '신고가 접수되었습니다.',
                          `@${message.sender.textId}: ${message.content} `
                        )
                      }}
                    >
                      신고
                    </LinkText>
                  </HStack>
                  <Text
                    style={{ color: '#666', fontSize: 12, marginLeft: 'auto' }}
                  >
                    {new Date(message.createdAt).toLocaleString()}
                  </Text>
                </React.Fragment>
              )}
            </Box>
          ))}
        </ScrollView>
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginBottom: Platform.OS === 'ios' ? 10 : 40,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Input variant="outline" size="md" style={{ flex: 1 }}>
            <InputField value={value} onChangeText={(text) => setValue(text)} />
          </Input>
          <Button
            size="md"
            variant="solid"
            style={{
              backgroundColor: '#036B3F',
              marginLeft: 10,
            }}
            isDisabled={!value}
            onPress={() => handleSend()}
          >
            <ButtonText>전송</ButtonText>
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  )
}
