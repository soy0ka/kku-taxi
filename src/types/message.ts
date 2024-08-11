export interface Message {
  id: number
  content: string
  createdAt: Date
  isdeleted: boolean
  isSystem: boolean
  sender: {
    id: number
    name: string
    textId: string
    email: string
  }
}
