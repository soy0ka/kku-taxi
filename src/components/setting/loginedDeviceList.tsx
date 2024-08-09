import { formatDateToKorean } from '@/utils/dateFormatter'
import {
  Card,
  Heading,
  HStack,
  LinkText,
  ScrollView,
  Text,
} from '@gluestack-ui/themed'
import React from 'react'

interface ApiDevice {
  id: number
  device: string
  platform: string
  token: string
  createdAt: string
}

interface LoginedDeviceListProps {
  devices: ApiDevice[]
  currentdevice: string
  expireToken: (token: string) => void
}

const LoginedDeviceList: React.FC<LoginedDeviceListProps> = ({
  devices,
  currentdevice,
  expireToken,
}) => {
  return (
    <React.Fragment>
      <Heading fontSize={18} mt={10}>
        로그인된 기기
      </Heading>
      <ScrollView style={{ maxHeight: '60%' }}>
        {devices && devices.length ? (
          devices?.map((device: ApiDevice) => (
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
              <Text>로그인 : {formatDateToKorean(device.createdAt)}</Text>
            </Card>
          ))
        ) : (
          <Text sx={{ mb: 10 }}>디바이스 정보를 불러올 수 없습니다</Text>
        )}
      </ScrollView>
    </React.Fragment>
  )
}

export default LoginedDeviceList
