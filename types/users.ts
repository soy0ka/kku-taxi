export interface AnotherUser {
  id: number
  name: string
  email: string
}

export interface UserMe {
  id: number
  name: string
  email: string
  textId: string
  bankaccount: {
    bankName: string
    account: string
    holder: string
  }[]
  _count: { partyMemberships: number }
}
