import { UserMe } from '@/src/types/users'
import { Profile } from '@/src/utils/gravatar'
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Heading,
  HStack,
  LinkText,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import React from 'react'

interface UserProfileProps {
  user: UserMe | null
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setModal }) => {
  return (
    <React.Fragment>
      <HStack style={{ alignItems: 'center' }} mb={20}>
        <Avatar size="md" bgColor="#036B3F">
          <AvatarFallbackText>{user?.name}</AvatarFallbackText>
          <AvatarImage
            source={{ uri: Profile(user?.textId) }}
            alt={`${user?.name}의 프로필사진`}
          />
        </Avatar>
        <VStack>
          <Heading ml={10} fontSize={18}>
            {user?.name}
          </Heading>
          <Text ml={10}>@{user?.textId}</Text>
        </VStack>
      </HStack>
      <HStack>
        <Text mb={5}>
          계좌번호:{' '}
          {user?.bankaccount[0]
            ? `${user?.bankaccount[0].bankName} ${user?.bankaccount[0].account}`
            : '계좌정보 없음'}
        </Text>
        <LinkText
          size="sm"
          style={{ marginLeft: 'auto' }}
          onPress={() => setModal(true)}
        >
          정보수정
        </LinkText>
      </HStack>
      <Heading fontSize={18}>매너온도 36.5°C</Heading>
      <Progress value={36.5} w={300} size="md">
        <ProgressFilledTrack />
      </Progress>
    </React.Fragment>
  )
}

export default UserProfile
