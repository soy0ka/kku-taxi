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
  LinkText,
  Progress,
  ProgressFilledTrack,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { router, useNavigation } from 'expo-router'
import React from 'react'
import { BankAccountModal } from '../../components/accountChange'
import { UserMe } from '../../types/users'
import { tokenManager, userManager } from '../../utils/localStorage'
import styles from '../styles'
import { fetcher, getDeviceId, poster, Profile } from '../util'

export default function Tab() {
  const navigation = useNavigation()
  const [user, setUser] = React.useState<UserMe | null>(null)
  const [devices, setDevices] = React.useState<string[]>([])
  const [currentdevice, setDevice] = React.useState<string>('')
  const [modal, setModal] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUser()
      fetchDevices()
      fetchDevice()
    })

    return unsubscribe
  }, [navigation])

  const fetchDevice = async () => {
    const device = await getDeviceId()
    setDevice(device || '')
  }

  const fetchUser = async () => {
    const user = await userManager.getUser()
    setUser(user)
  }

  const fetchDevices = async () => {
    const device = await fetcher('/auth/mydevice')
    setDevices(device)
  }

  React.useEffect(() => {
    const fetchDevice = async () => {
      const device = await getDeviceId()
      setDevice(device || '')
    }
    fetchDevice()
  }, [])

  const handleLogout = () => {
    fetcher('/auth/logout')
    tokenManager.removeToken()
    router.push('/')
  }

  const expireToken = (token: string) => {
    setDevices(devices.filter((device: any) => device.token !== token))
    poster('/auth/logout', { token })
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분`
  }

  return (
    <SafeAreaView>
      <BankAccountModal isOpen={modal} onClose={() => setModal(false)} />
      <Box style={{ padding: 20 }} mt={10}>
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
            {user?.account
              ? user?.account.bankName + ' ' + user?.account.account
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
        <Heading fontSize={18} mt={10}>
          로그인된 기기
        </Heading>
        <ScrollView style={{ maxHeight: '60%' }}>
          {devices && devices.length ? (
            devices?.map((device: any) => (
              <Card
                key={device.id}
                style={{
                  padding: 10,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                {currentdevice === device.device && (
                  <Text color="#036B3F" bold={true}>
                    현재기기
                  </Text>
                )}
                <HStack space="md" reversed={false}>
                  <Text>{device.platform}</Text>
                  <LinkText
                    size="sm"
                    style={{ marginLeft: 'auto' }}
                    onPress={() => expireToken(device.token)}
                  >
                    로그아웃
                  </LinkText>
                </HStack>
                <Text>로그인 : {formatDate(device.createdAt)}</Text>
              </Card>
            ))
          ) : (
            <Text sx={{ mb: 10 }}>애플 테스트 계정입니다</Text>
          )}
        </ScrollView>
        <Button
          style={styles.Button}
          onPress={() => {
            handleLogout()
          }}
        >
          <ButtonText>로그아웃</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  )
}
