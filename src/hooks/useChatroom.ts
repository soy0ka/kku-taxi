import { AlertRef } from '@/src/components/alert'
import { Message } from '@/src/types/message'
import { Party } from '@/src/types/parties'
import { UserMe } from '@/src/types/users'
import { fetcher } from '@/src/utils/apiClient'
import { userManager } from '@/src/utils/localStorage'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const useChatroom = (id: number) => {
  const [user, setUser] = useState<UserMe | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [party, setParty] = useState<Party>()
  const [socket, setSocket] = useState<Socket | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollViewRef = useRef<any>(null)
  const alertRef = useRef<AlertRef>(null)

  const URL = process.env.EXPO_PUBLIC_WS_URL ?? 'http://localhost:3000'

  useEffect(() => {
    const ws = io(URL)
    setSocket(ws)
    ws.emit('joinRoom', id)
    fetchUser()
    setMessages([])
    fetchMessages()
    fetchParty()

    return () => {
      ws.disconnect()
    }
  }, [id])

  useEffect(() => {
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

  const handleSend = async (value: string) => {
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
  }

  return {
    user,
    messages,
    party,
    scrollViewRef,
    alertRef,
    fetchMessages,
    handleSend,
    // setPayModalOpen,
  }
}

export default useChatroom
