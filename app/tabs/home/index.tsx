import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  AddIcon,
  Alert,
  AlertIcon,
  AlertText,
  Avatar,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Card,
  Divider,
  Fab,
  FabIcon,
  FabLabel,
  Heading,
  HStack,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { router, useNavigation } from 'expo-router'
import React from 'react'
import { PartyModal, PartyModalRef } from '../../../components/partyModal'
import { Party } from '../../../types/parties'
import styles from '../../styles'
import { fetcher, Profile } from '../../util'

export default function Home() {
  const navigation = useNavigation()
  const [direction, setDirection] = React.useState<'toSchool' | 'fromSchool'>(
    'fromSchool'
  )
  const [parties, setParties] = React.useState<Party[]>([])
  const [notification, setNotification] = React.useState<string | null>(null)

  const partyModalRef = React.useRef<PartyModalRef>(null)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDirection('fromSchool')
      fetchNotification()
      fetchParties()
    })

    return unsubscribe
  }, [navigation])

  const fetchNotification = async () => {
    const notification = await fetcher('/notice')
    setNotification(notification)
  }

  const fetchParties = async () => {
    const parties = await fetcher(`/party?direction=${direction}`)
    setParties(parties)
  }

  React.useEffect(() => {
    fetchParties()
  }, [direction])

  const formatTime = (date: string) => {
    const d = new Date(date)
    const now = new Date()

    const year =
      d.getFullYear() === now.getFullYear() ? '' : `${d.getFullYear()}년 `

    const isToday = d.toDateString() === now.toDateString()
    const isTomorrow =
      d.toDateString() ===
      new Date(now.setDate(now.getDate() + 1)).toDateString()
    const isDayAfterTomorrow =
      d.toDateString() ===
      new Date(now.setDate(now.getDate() + 1)).toDateString()

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

  return (
    <React.Fragment>
      <SafeAreaView>
        <Box>
          {notification && (
            <Alert action="info" variant="accent">
              <AlertIcon
                as={() => <FontAwesome name="info-circle" size={20} />}
              />
              <AlertText ml={10}>{notification}</AlertText>
            </Alert>
          )}
          <Box style={{ padding: 20 }}>
            <HStack>
              <Button
                style={{ ...styles.Button, width: '49%' }}
                onPress={() => setDirection('toSchool')}
                isDisabled={direction === 'toSchool'}
              >
                <ButtonText>학교 방면</ButtonText>
              </Button>
              <Button
                onPress={() => setDirection('fromSchool')}
                style={{ ...styles.Button, width: '49%', marginLeft: 'auto' }}
                isDisabled={direction === 'fromSchool'}
              >
                <ButtonText>시내 방면</ButtonText>
              </Button>
            </HStack>
            <Divider mt={20} mb={20} />
            {parties && parties.length ? (
              <ScrollView maxHeight="$96">
                {parties.map((party: Party) => (
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
                          {party.name} ({party._count.partyMemberships} /{' '}
                          {party.maxSize} 명)
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
                ))}
              </ScrollView>
            ) : (
              <Text style={{ textAlign: 'center' }}>팟이 없습니다.</Text>
            )}
          </Box>
        </Box>
      </SafeAreaView>
      <Fab
        placement="bottom right"
        size="md"
        onPress={() => router.push('/tabs/home/create')}
        sx={{ backgroundColor: '#036B3F' }}
      >
        <FabIcon as={AddIcon} />
        <FabLabel>팟 만들기</FabLabel>
      </Fab>
    </React.Fragment>
  )
}
