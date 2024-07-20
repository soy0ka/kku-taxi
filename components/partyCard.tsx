import {
  Avatar,
  AvatarImage,
  Box,
  Card,
  Heading,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import React from 'react'
import { Profile } from '../app/util'
import { Party } from '../types/parties'
import { PartyModal, PartyModalRef } from './partyModal'

interface PartyCardProps {
  party: Party
  partyModalRef: React.RefObject<PartyModalRef>
}

const formatTime = (date: string) => {
  const d = new Date(date)
  const now = new Date()

  const year =
    d.getFullYear() === now.getFullYear() ? '' : `${d.getFullYear()}년 `

  const isToday = d.toDateString() === now.toDateString()
  const isTomorrow =
    d.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString()
  const isDayAfterTomorrow =
    d.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString()

  let dayPart
  if (isToday) {
    dayPart = '오늘'
  } else if (isTomorrow) {
    dayPart = '내일'
  } else if (isDayAfterTomorrow) {
    dayPart = '모레'
  } else {
    dayPart = `${d.getMonth() + 1}월 ${d.getDate()}일`
  }

  return `${year}${dayPart} ${d.getHours()}시 ${d.getMinutes()}분`
}

export const PartyCard: React.FC<PartyCardProps> = ({
  party,
  partyModalRef,
}) => {
  return (
    <Pressable
      key={party.id}
      onPress={() => {
        partyModalRef.current?.openModal(party)
      }}
    >
      <PartyModal ref={partyModalRef} />
      <Card>
        <Text>{formatTime(party.departure)} 출발</Text>
        <VStack mb="$6">
          <Heading size="md" fontFamily="$heading" mb="$1">
            {party.name} ({party._count.partyMemberships} / {party.maxSize} 명)
          </Heading>
          <Text size="sm" fontFamily="$heading" fontSize="$lg">
            {party.fromPlace.name} → {party.toPlace.name}
          </Text>
        </VStack>
        <Box flexDirection="row">
          <Avatar mr="$3">
            <AvatarImage
              source={{
                uri: Profile(party.owner.email.split('@')[0]),
              }}
              alt={party.owner.name}
            />
          </Avatar>
          <VStack>
            <Heading size="sm" fontFamily="$heading">
              {party.owner.name}
            </Heading>
            <Text size="sm" fontFamily="$heading">
              @{party.owner.email.split('@')[0]}
            </Text>
          </VStack>
        </Box>
      </Card>
    </Pressable>
  )
}
