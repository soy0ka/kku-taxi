export interface AnotherUser {
  id: number
  name: string
  email: string
}

export interface UserMe {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  isdeleted: boolean
  textId: string
  _count: { partyMemberships: number }
}
