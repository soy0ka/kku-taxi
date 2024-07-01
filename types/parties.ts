import { AnotherUser } from './users'
export interface Party {
  id: number
  name: string
  maxSize: number
  description: string
  ownerId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  isdone: boolean
  chatRoomId: number
  departure: string
  fromPlaceId: number
  toPlaceId: number
  fromPlace: Place
  to: Place
  from: Place
  toPlace: Place
  owner: AnotherUser
  _count: { partyMemberships: number }
}

interface Place {
  id: number
  name: string
}
