import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertText,
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  ScrollView,
  Text,
} from '@gluestack-ui/themed'
import io from 'socket.io-client'
import { useLocalSearchParams } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function Chatroom() {
  const { id } = useLocalSearchParams()
  const [messages, setMessages] = React.useState<string[]>([])
  const [notification, setNotification] = React.useState<string>('')

  React.useEffect(() => {
    const socket = io('http://10.20.19.186:3000', {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message])
    })
  }, [])

  return (
    <Box>
      {notification && (
        <Alert action="info" variant="accent">
          <AlertIcon as={() => <FontAwesome name="info-circle" size={20} />} />
          <AlertText ml={10}>{notification}</AlertText>
        </Alert>
      )}
      <ScrollView style={{ padding: 10 }}>
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
            <Text>{id}</Text>
          </Box>
        ))}
      </ScrollView>
      <Box style={{ padding: 10 }}>
        <Input variant="outline" size="md">
          <InputField />
          <Button
            size="md"
            variant="solid"
            style={{
              backgroundColor: '#036B3F',
            }}
          >
            <ButtonText>전송</ButtonText>
          </Button>
        </Input>
      </Box>
    </Box>
  )
}
