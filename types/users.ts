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
  account: {
    bankName: string
    account: string
    holder: string
  }
  _count: { partyMemberships: number }
}
