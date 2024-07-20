import { fetcher, Profile } from '@/app/util'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Card,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Heading,
  HStack,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
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
    const members = await fetcher(`/party/chat/${id}`)
    setMembers(members.partyMemberships)
  }
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 5 }} mt={10}>
        <Box
          sx={{
            alignItems: 'flex-start',
            flex: 1,
            mr: 10,
            ml: 10,
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
                            uri: Profile(member.User.email.split('@')[0]),
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
                    <Accordion
                      width="100%"
                      size="md"
                      variant="unfilled"
                      type="single"
                      isCollapsible={true}
                      isDisabled={false}
                    >
                      <AccordionItem value="a">
                        <AccordionHeader>
                          <AccordionTrigger>
                            {({ isExpanded }) => {
                              return (
                                <>
                                  <AccordionTitleText>
                                    이 이용자에게 문제가 있었나요?
                                  </AccordionTitleText>
                                  {isExpanded ? (
                                    <AccordionIcon as={ChevronUpIcon} />
                                  ) : (
                                    <AccordionIcon as={ChevronDownIcon} />
                                  )}
                                </>
                              )
                            }}
                          </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                          {[
                            '제 시간에 도착하지 않았어요',
                            '정산 금액을 보내지 않았어요',
                            '장소에 나타나지 않았어요',
                            '비매너 행동을 했어요',
                          ].map((value) => (
                            <Checkbox
                              size="md"
                              mt="$0.5"
                              aria-label="Checkbox"
                              value={''}
                              key={value}
                            >
                              <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={CheckIcon} />
                              </CheckboxIndicator>
                              <CheckboxLabel>{value}</CheckboxLabel>
                            </Checkbox>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </VStack>
                </Card>
              ))}
              <Button
                size="md"
                action="positive"
                sx={{ width: '100%', mt: '$5', mb: '$10' }}
                borderWidth="$0"
                onPress={() => {}}
              >
                <ButtonText>제출하기</ButtonText>
              </Button>
            </Box>
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}
