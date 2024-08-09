import { Party } from '@/src/types/parties'
import { UserMe } from '@/src/types/users'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  Heading,
  Text,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import React from 'react'

interface ChatroomHeaderProps {
  party: Party
  user: UserMe | null
  setPayModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatroomHeader: React.FC<ChatroomHeaderProps> = ({
  party,
  user,
  setPayModalOpen,
}) => {
  return (
    <Card style={{ padding: 10, flexDirection: 'column' }}>
      <Heading size="md">
        {party.name} {'[ '}
        {party._count.partyMemberships} / {party.maxSize}
        {' ]'}
      </Heading>
      <Text>
        {party.fromPlace.name} → {party.toPlace.name}
      </Text>
      <Box
        mt="$2.5"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {party.ownerId !== user?.id && (
          <Button
            size="sm"
            variant="outline"
            style={{ borderColor: '$black' }}
            onPress={() => {
              router.push(`/tabs/chat/finish?id=${party.id}`)
            }}
          >
            <ButtonIcon
              as={() => (
                <FontAwesome
                  style={{ color: '$black' }}
                  name="pencil-square-o"
                />
              )}
            />
            <ButtonText ml="$2" sx={{ color: '$black' }}>
              후기작성
            </ButtonText>
          </Button>
        )}
        {party.ownerId === user?.id && (
          <React.Fragment>
            <Button
              ml="$2"
              size="sm"
              variant="outline"
              style={{ borderColor: '#399918' }}
              isDisabled={party.payRequested}
              onPress={() => {
                setPayModalOpen(true)
              }}
            >
              <ButtonIcon
                as={() => (
                  <FontAwesome style={{ color: '#399918' }} name="money" />
                )}
              />
              <ButtonText ml="$2" sx={{ color: '#399918' }}>
                정산요청
              </ButtonText>
            </Button>
            <Button
              size="sm"
              ml="$2"
              variant="outline"
              style={{ borderColor: '#FF7777' }}
              onPress={() => {
                router.push(`/tabs/chat/finish?id=${party.id}`)
              }}
            >
              <ButtonIcon
                as={() => (
                  <FontAwesome style={{ color: '#FF7777' }} name="car" />
                )}
              />
              <ButtonText ml="$2" sx={{ color: '#FF7777' }}>
                운행종료
              </ButtonText>
            </Button>
          </React.Fragment>
        )}
      </Box>
    </Card>
  )
}

export default ChatroomHeader
