import React from 'react'
import styles from '../../styles'
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
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function Chatroom() {
  const [notification, setNotification] = React.useState<string>('카피바라~ 카피바라 카피바라 카피바라 카피바라')
  const [messages, setMessages] = React.useState<string[]>([])
  const webSocket = React.useRef<WebSocket | null>(null)

  React.useEffect(() => {
    webSocket.current = new WebSocket('ws://192.168.0.2:3000')
    webSocket.current.onopen = () => {
      console.log('WebSocket 연결!')
    }
    webSocket.current.onclose = (error: any) => {
      console.log(error)
    }
    webSocket.current.onerror = (error: any) => {
      console.log(error)
    }
    webSocket.current.onmessage = (event: MessageEvent) => {
      setMessages((prev) => [...prev, event.data])
    }

    return () => {
      webSocket.current?.close()
    }
  }, [])

  const sendMessage = (message: string) => {
    if (webSocket.current?.readyState === WebSocket.OPEN) {
      webSocket.current.send(message)
    }
  }
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
          <Box key={i} style={{ padding: 10, backgroundColor: '#F0F0F0', borderRadius: 10, marginBottom: 10 }}>
            <Text>{message}</Text>
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
