import ChatroomHeader from '@/components/chat/chatroomHeader'
import MessageInput from '@/components/chat/messageInput'
import MessageList from '@/components/chat/messageList'
import { PayRequestModal } from '@/components/payRequest'
import useChatroom from '@/hooks/useChatroom'
import { Message } from '@/types/message'
import { Box, KeyboardAvoidingView } from '@gluestack-ui/themed'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import { io, Socket } from 'socket.io-client'

const Chatroom: React.FC = () => {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()
  const [value, setValue] = useState<string>('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const [payModalOpen, setPayModalOpen] = useState(false)

  const {
    user,
    messages,
    party,
    scrollViewRef,
    setMessages,
    fetchMessages,
    fetchParty,
    fetchUser
  } = useChatroom(Number(id))

  const URL = process.env.EXPO_PUBLIC_WS_URL ?? 'http://localhost:3000'

  useEffect(() => {
    const ws = io(URL + '/chat')
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
  }, [id, navigation])

  useEffect(() => {
    if (!socket) return

    const messageHandler = (message: { message: Message }) => {
      setMessages((prev) => [...prev, message.message])
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }

    socket.on('messageCreate', messageHandler)

    return () => {
      socket.off('messageCreate', messageHandler)
    }
  }, [socket])

  const handleSend = async (value: string) => {
    if (!value || !user) return
    setValue('')
    socket?.emit('messageCreate', {
      content: value,
      senderId: user.id,
      roomId: id,
      sender: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  }

  useEffect(() => {
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
        {party && (
          <ChatroomHeader
            party={party}
            user={user}
            setPayModalOpen={setPayModalOpen}
          />
        )}
        <MessageList messages={messages} scrollViewRef={scrollViewRef} />
        <MessageInput
          value={value}
          setValue={setValue}
          handleSend={() => handleSend(value)}
        />
      </Box>
    </KeyboardAvoidingView>
  )
}

export default Chatroom
