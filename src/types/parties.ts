import { AnotherUser } from './users'

export interface BaseParty {
  id: number
  name: string
  departure: string
}

export interface ChatParty extends BaseParty {
  fromPlace: Place
  toPlace: Place
}

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
  payRequested: boolean
  _count: { partyMemberships: number }
}

export interface Place {
  id: number
  name: string
}
