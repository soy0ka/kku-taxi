import { ChatParty } from './parties'
export interface ChatRoom {
  id: number
  name: string
  Party: ChatParty[]
}
