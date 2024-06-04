import React from 'react'
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonText,
  HStack,
  Input,
  InputField,
  ScrollView,
  Text,
  VStack,
  Heading,
  AvatarImage,
  KeyboardAvoidingView,
} from '@gluestack-ui/themed'
import { io, Socket } from 'socket.io-client'
import { fetcher, Profile } from '../../util'
import { Keyboard, Platform } from 'react-native'
import { Alert } from '../../../components/alert'
import { userManager } from '../../../utils/localStorage'
import { useLocalSearchParams, useNavigation } from 'expo-router'

interface Message {
  id: number
  content: string
  isdeleted: boolean
  createdAt: string
  sender: {
    id: number
    name: string
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
  const [connection, setConnection] = React.useState<boolean>(false)
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
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      },
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
              <HStack space="md">
                <Avatar bgColor="$indigo600">
                  <AvatarFallbackText>{message.sender.name}</AvatarFallbackText>
                  <AvatarImage
                    source={{ uri: Profile(message.sender.name) }}
                    alt={`${message.sender.name}의 프로필사진`}
                  />
                </Avatar>
                <VStack>
                  <Heading size="sm">{message.sender.name}</Heading>
                  <Text size="sm">{message.content}</Text>
                </VStack>
                <Text style={{ color: '#666', fontSize: 12, marginLeft: 'auto' }}>
                  {new Date(message.createdAt).toLocaleString()}
                </Text>
              </HStack>
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
            <InputField
              value={value}
              onChangeText={(text) => setValue(text)}
            />
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
