import styles from '@/app/styles'
import { BankAccountModal } from '@/components/accountChange'
import LoginedDeviceList from '@/components/setting/loginedDeviceList'
import UserProfile from '@/components/setting/userProfile'
import { ApiStatus } from '@/types/api'
import { UserMe } from '@/types/users'
import { deleter, fetcher, getDeviceId } from '@/utils/apiClient'
import { tokenManager, userManager } from '@/utils/localStorage'
import { Box, Button, ButtonText, SafeAreaView } from '@gluestack-ui/themed'
import { router, useNavigation } from 'expo-router'
import React from 'react'

interface ApiDevice {
  id: number
  device: string
  platform: string
  token: string
  createdAt: string
}

export default function SettingTab() {
  const navigation = useNavigation()
  const [user, setUser] = React.useState<UserMe | null>(null)
  const [devices, setDevices] = React.useState<ApiDevice[]>([])
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
    const user = await fetcher('/user/@me')
    await userManager.setUser(user.data)
    setUser(user.data)
  }

  const fetchDevices = async () => {
    const device = await fetcher('/user/@me/devices')
    setDevices(device.data)
  }

  const handleLogout = () => {
    fetcher('/auth/logout')
    tokenManager.removeToken()
    router.push('/')
  }

  const expireToken = (id: number) => {
    setDevices(devices.filter((device: ApiDevice) => device.id !== id))
    deleter(`/user/@me/devices/${id}`).then((res) => {
      if (res.status === ApiStatus.SUCCESS) {
        fetchDevices()
      }
    })
  }

  return (
    <SafeAreaView>
      <BankAccountModal isOpen={modal} onClose={() => setModal(false)} />
      <Box style={{ padding: 20 }} mt={10}>
        <UserProfile user={user} setModal={setModal} />
        <LoginedDeviceList
          devices={devices}
          currentdevice={currentdevice}
          expireToken={expireToken}
        />
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
