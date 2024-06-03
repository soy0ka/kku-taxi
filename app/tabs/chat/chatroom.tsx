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
import { useLocalSearchParams, useNavigation } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { fetcher, poster } from '../../util'

export default function Chatroom() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const [value, setValue] = React.useState<string>('')
  const [messages, setMessages] = React.useState<string[]>([])
  const [notification, setNotification] = React.useState<string>('')

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {
      setMessages([])
      const response = await fetcher(`/chat/room/${id}`)
      if (!response) return
      for (const message of response) {
        setMessages((prev) => [...prev, message.content])
      }
    })

    return unsubscribe
  }, [navigation])


  const ws = new WebSocket(`ws://localhost:3000`)
  ws.onopen = () => {
    console.log('Connected to WebSocket server')
    ws.send('something')
  }
  React.useEffect(() => {
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
            <Text>{message}</Text>
          </Box>
        ))}
      </ScrollView>
      <Box style={{ padding: 10 }}>
        <Input variant="outline" size="md">
          <InputField value={value} onChangeText={(text) => setValue(text)}/>
          <Button
            size="md"
            variant="solid"
            style={{
              backgroundColor: '#036B3F',
            }}
            onPress={() => handleSend()}
          >
            <ButtonText>전송</ButtonText>
          </Button>
        </Input>
      </Box>
    </Box>
  )
}
