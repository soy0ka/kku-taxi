import { PartyModal, PartyModalRef } from '@/components/partyModal'
import { Party } from '@/types/parties'
import { formatDateWithRelativeDay } from '@/utils/dateFormatter'
import { Profile } from '@/utils/gravatar'
import {
  Avatar,
  AvatarImage,
  Box,
  Card,
  Heading,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import React from 'react'

interface PartyCardProps {
  party: Party
  partyModalRef: React.RefObject<PartyModalRef>
}

export const PartyCard: React.FC<PartyCardProps> = ({
  party,
  partyModalRef
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
        <Text>{formatDateWithRelativeDay(party.departure)} 출발</Text>
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
                uri: Profile(party.owner.email.split('@')[0])
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
