import { Alert } from '@/components/alert'
import ChatroomHeader from '@/components/chat/chatroomHeader'
import MessageInput from '@/components/chat/messageInput'
import MessageList from '@/components/chat/messageList'
import { PayRequestModal } from '@/components/payRequest'
import useChatroom from '@/hooks/useChatroom'
import { Box, KeyboardAvoidingView } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'

const Chatroom: React.FC = () => {
  const { id } = useLocalSearchParams()
  const [value, setValue] = useState<string>('')
  const [payModalOpen, setPayModalOpen] = useState(false)

  const { user, messages, party, scrollViewRef, alertRef, handleSend } =
    useChatroom(Number(id))

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
        <Alert ref={alertRef} />
        {party && (
          <ChatroomHeader
            party={party}
            user={user}
            setPayModalOpen={setPayModalOpen}
          />
        )}
        <MessageList
          messages={messages}
          scrollViewRef={scrollViewRef}
          alertRef={alertRef}
        />
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
