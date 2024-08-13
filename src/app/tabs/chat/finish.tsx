import { FeedbackAccordion } from '@/components/chat/feedbackAccordion'
import { fetcher } from '@/utils/apiClient'
import { Profile } from '@/utils/gravatar'
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  SafeAreaView,
  ScrollView,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React from 'react'

interface PartyMember {
  User: {
    id: number
    name: string
    email: string
  }
}
export default function Finish() {
  const { id } = useLocalSearchParams()
  const [members, setMembers] = React.useState<PartyMember[]>([])
  const navigation = useNavigation()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMembers()
    })

    return unsubscribe
  }, [navigation])

  const fetchMembers = async () => {
    const members = await fetcher(`/party/${id}/membsers`)
    console.log(members)
    setMembers(members.data)
  }
  return (
    <SafeAreaView sx={{ flex: 1 }}>
      <ScrollView style={{ padding: 5 }} mt={10}>
        <Box
          sx={{
            alignItems: 'flex-start',
            flex: 1,
            mr: 10,
            ml: 10
          }}
        >
          <Heading>운행 종료</Heading>
          <Text>택시의 운행이 종료된 후에 이용해주세요</Text>
          {members && members.length > 0 && (
            <Box sx={{ width: '100%' }}>
              <Heading>참여자 목록</Heading>
              {members.map((member) => (
                <Card key={member.User.id} mt={2} pr="$2" pl="$2">
                  <VStack>
                    <HStack sx={{ alignItems: 'center' }}>
                      <Avatar bgColor="$indigo600">
                        <AvatarFallbackText>
                          {member.User.name}
                        </AvatarFallbackText>
                        <AvatarImage
                          source={{
                            uri: Profile(member.User.email.split('@')[0])
                          }}
                          alt={`${member.User.name}의 프로필사진`}
                        />
                      </Avatar>
                      <Heading ml="$3" size="sm">
                        {member.User.name}
                      </Heading>
                      <Text
                        style={{ color: '#666', marginLeft: 5 }}
                        fontSize={12}
                      >
                        @{member.User.email.split('@')[0]}
                      </Text>
                    </HStack>
                    <FeedbackAccordion />
                  </VStack>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </ScrollView>
      <Box
        sx={{
          padding: 10,
          backgroundColor: 'white' // 필요시 배경 색상 설정
        }}
      >
        <Button
          size="md"
          action="positive"
          sx={{ width: '100%' }}
          borderWidth="$0"
          onPress={() => {}}
        >
          <ButtonText>제출하기</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  )
}
