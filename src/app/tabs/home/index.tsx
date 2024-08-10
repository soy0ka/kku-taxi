import styles from '@/app/styles'
import { PartyCard } from '@/components/partyCard'
import { PartyModalRef } from '@/components/partyModal'
import { ApiStatus } from '@/types/api'
import { Party } from '@/types/parties'
import { fetcher } from '@/utils/apiClient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  AddIcon,
  Alert,
  AlertIcon,
  AlertText,
  Box,
  Button,
  ButtonText,
  Divider,
  Fab,
  FabIcon,
  FabLabel,
  HStack,
  SafeAreaView,
  ScrollView,
  Text,
} from '@gluestack-ui/themed'
import { router, useNavigation } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

export default function Home() {
  const navigation = useNavigation()
  const [direction, setDirection] = React.useState<'toSchool' | 'fromSchool'>(
    'fromSchool',
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
    if (notification.status === ApiStatus.SUCCESS) {
      setNotification(notification.data.message)
    }
  }

  const fetchParties = async () => {
    const parties = await fetcher(`/party?direction=${direction}`)
    setParties(parties.data)
  }

  React.useEffect(() => {
    fetchParties()
  }, [direction])

  return (
    <React.Fragment>
      <SafeAreaView>
        <Box>
          {notification && (
            <Alert
              action="info"
              variant="accent"
              sx={{ mt: Platform.select({ ios: 0, android: 20 }) }}
            >
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
                  <PartyCard
                    key={party.id}
                    party={party}
                    partyModalRef={partyModalRef}
                  />
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
