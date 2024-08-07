import { Alert, AlertRef } from '@/components/alert'
import { PayRequestModal } from '@/components/payRequest'
import { Party } from '@/types/parties'
import { UserMe } from '@/types/users'
import { fetcher, poster } from '@/utils/apiClient'
import { getTextId } from '@/utils/getTextId'
import { Profile } from '@/utils/gravatar'
import { userManager } from '@/utils/localStorage'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Card,
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
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import React from 'react'
import { Keyboard, Platform } from 'react-native'
import { io, Socket } from 'socket.io-client'

interface Message {
  id: number
  content: string
  isdeleted: boolean
  isSystem: boolean
  createdAt: string
  sender: {
    id: number
    name: string
    email: string
  }
}

export default function Chatroom() {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()
  const alertRef = React.useRef<AlertRef>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollViewRef = React.useRef<any>(null)
  const [user, setUser] = React.useState<UserMe | null>(null)
  const [value, setValue] = React.useState<string>('')
  const [messages, setMessages] = React.useState<Message[]>([])
  const [party, setParty] = React.useState<Party>()
  const [socket, setSocket] = React.useState<Socket | null>(null)
  const [payModalOpen, setPayModalOpen] = React.useState(false)
  const URL = process.env.EXPO_PUBLIC_WS_URL ?? 'http://localhost:3000'

  React.useEffect(() => {
    const ws = io(URL)
    setSocket(ws)
    ws.emit('joinRoom', id)
    fetchUser()
    setMessages([])
    fetchMessages()
    fetchParty()
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

  const fetchMessages = async () => {
    const response = await fetcher(`/chat/${id}/messages`)
    if (response) {
      setMessages(response.data)
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }

  const fetchParty = async () => {
    const response = await fetcher(`/chat/${id}/details`)
    setParty(response.data.Party[0])
  }

  const fetchUser = async () => {
    const user = await userManager.getUser()
    setUser(user)
  }

  const handleSend = async () => {
    if (!value || !user) return
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
      keyboardVerticalOffset={Platform.select({ ios: 90, android: 130 })}
    >
      <Box style={{ flex: 1 }}>
        <PayRequestModal
          isOpen={payModalOpen}
          party={party}
          onClose={() => {
            setPayModalOpen(false)
          }}
        />
        <Alert ref={alertRef} />
        {party && (
          <Card style={{ padding: 10, flexDirection: 'column' }}>
            <Heading size="md">
              {party.name} {'[ '}
              {party._count.partyMemberships} / {party.maxSize}
              {' ]'}
            </Heading>
            <Text>
              {party.fromPlace.name} → {party.toPlace.name}
            </Text>
            <Box
              mt="$2.5"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {party.ownerId !== user?.id && (
                <Button
                  size="sm"
                  variant="outline"
                  style={{ borderColor: '$black' }}
                  onPress={() => {
                    router.push(`/tabs/chat/finish?id=${id}`)
                  }}
                >
                  <ButtonIcon
                    as={() => (
                      <FontAwesome
                        style={{ color: '$black' }}
                        name="pencil-square-o"
                      />
                    )}
                  />
                  <ButtonText ml="$2" sx={{ color: '$black' }}>
                    후기작성
                  </ButtonText>
                </Button>
              )}
              {party.ownerId === user?.id && (
                <React.Fragment>
                  <Button
                    ml="$2"
                    size="sm"
                    variant="outline"
                    style={{ borderColor: '#399918' }}
                    isDisabled={party.payRequested}
                    onPress={() => {
                      setPayModalOpen(true)
                    }}
                  >
                    <ButtonIcon
                      as={() => (
                        <FontAwesome
                          style={{ color: '#399918' }}
                          name="money"
                        />
                      )}
                    />
                    <ButtonText ml="$2" sx={{ color: '#399918' }}>
                      정산요청
                    </ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    ml="$2"
                    variant="outline"
                    style={{ borderColor: '#FF7777' }}
                    onPress={() => {
                      router.push(`/tabs/chat/finish?id=${id}`)
                    }}
                  >
                    <ButtonIcon
                      as={() => (
                        <FontAwesome style={{ color: '#FF7777' }} name="car" />
                      )}
                    />
                    <ButtonText ml="$2" sx={{ color: '#FF7777' }}>
                      운행종료
                    </ButtonText>
                  </Button>
                </React.Fragment>
              )}
            </Box>
          </Card>
        )}
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
                        source={{
                          uri: Profile(getTextId(message.sender.email)),
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
                          reason: 'unset',
                        })
                        alertRef.current?.openAlert(
                          '신고가 접수되었습니다.',
                          `@${getTextId(message.sender.email)}: ${
                            message.content
                          } `
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
