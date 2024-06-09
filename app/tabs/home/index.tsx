import React from 'react'
import {
  HStack,
  Alert,
  AlertIcon,
  AlertText,
  Box,
  Button,
  ButtonText,
  SafeAreaView,
  Divider,
  ScrollView,
  Fab,
  FabLabel,
  FabIcon,
  AddIcon,
  Card,
  Text,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
  Heading,
} from '@gluestack-ui/themed'
import styles from '../../styles'
import { fetcher, Profile } from '../../util'
import { router, useNavigation } from 'expo-router'
import * as Notifications from 'expo-notifications'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function Home() {
  const navigation = useNavigation()
  const [direction, setDirection] = React.useState<'toSchool' | 'fromSchool'>(
    'fromSchool',
  )
  const [parties, setParties] = React.useState<any>([])
  const [notification, setNotification] = React.useState<any>(null)

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
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

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        sound: 'default',
        title: 'You\'ve got mail! 📬',
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    })
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
            <Divider mt={20} />
            <ScrollView maxHeight="$96">
              {parties.map((party: any) => (
                <Card key={party.id}>
                  <Text>{formatTime(party.departure)} 출발</Text>
                  <VStack mb="$6">
                    <Heading size="md" fontFamily="$heading" mb='$1'>
                      {party.name} ({party._count.partyMemberships} / {party.maxSize} 명)
                    </Heading>
                    <Text size="sm" fontFamily="$heading" fontSize='$lg'>
                      {party.fromPlace.name} → {party.toPlace.name} 
                    </Text>
                  </VStack>
                  <Box flexDirection="row">
                    <Avatar mr="$3">
                      <AvatarImage
                        source={{
                          uri: Profile(party.owner.email.split('@')[0]),
                        }}
                        alt = {party.owner.name}
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
              ))}
            </ScrollView>
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
