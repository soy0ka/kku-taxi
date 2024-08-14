import { FeedbackAccordion } from '@/components/chat/feedbackAccordion'
import { useAlert } from '@/contexts/AlertContext'
import { ApiStatus } from '@/types/api'
import { fetcher, poster } from '@/utils/apiClient'
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
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import React from 'react'

interface PartyMember {
  User: {
    id: number
    name: string
    email: string
  }
}

interface Issue {
  userId: number
  issue: string[]
}

export default function Finish() {
  const { id } = useLocalSearchParams()
  const [members, setMembers] = React.useState<PartyMember[]>([])
  const [issues, setIssues] = React.useState<Issue[]>([])
  const navigation = useNavigation()
  const { showAlert } = useAlert()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMembers()
    })

    return unsubscribe
  }, [navigation])

  const handleSubmission = async () => {
    const response = await poster(`/party/${id}/finish`, {
      feedBack: issues
    })
    console.log(response)
    if (response.status === ApiStatus.SUCCESS) {
      showAlert('운행 종료', '피드백이 제출되었습니다')
      router.replace('/tabs/chat')
    } else {
      showAlert('운행 종료', '피드백 제출에 실패했습니다')
    }
  }

  const fetchMembers = async () => {
    const members = await fetcher(`/party/${id}/members`)

    setMembers(members.data)
  }

  const handleIssueChange = (userId: number, newIssues: string[]) => {
    setIssues((prevIssues) => {
      // 기존의 이슈를 업데이트하거나 새로 추가
      const updatedIssues = prevIssues.filter(
        (issue) => issue.userId !== userId
      )
      return [...updatedIssues, { userId, issue: newIssues }]
    })
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
                    <FeedbackAccordion
                      selectedIssues={
                        issues.find((issue) => issue.userId === member.User.id)
                          ?.issue || []
                      }
                      onChange={(newIssues) =>
                        handleIssueChange(member.User.id, newIssues)
                      }
                    />
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
          onPress={handleSubmission}
        >
          <ButtonText>제출하기</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  )
}
