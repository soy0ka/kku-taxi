import { Message } from '@/types/message'
import { Party } from '@/types/parties'
import { UserMe } from '@/types/users'
import { fetcher } from '@/utils/apiClient'
import { userManager } from '@/utils/localStorage'
import { useRef, useState } from 'react'

const useChatroom = (id: number) => {
  const [user, setUser] = useState<UserMe | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [party, setParty] = useState<Party>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollViewRef = useRef<any>(null)

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

  return {
    user,
    messages,
    party,
    scrollViewRef,
    setMessages,
    fetchMessages,
    fetchParty,
    fetchUser
    // setPayModalOpen,
  }
}

export default useChatroom
