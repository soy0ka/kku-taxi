import { Alert, AlertRef } from '@/src/components/alert'
import { ApiStatus } from '@/src/types/api'
import { fetcher, poster } from '@/src/utils/apiClient'
import { userManager } from '@/src/utils/localStorage'
import {
  Box,
  Button,
  ButtonText,
  Heading,
  Input,
  InputField,
  InputSlot,
  Text,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import React from 'react'
import Styles from './styles'

const LOGIN_URL = '/auth/login'
const EMAIL_DOMAIN = '@kku.ac.kr'

export default function Index() {
  const [email, setEmail] = React.useState('')
  const alertRef = React.useRef<AlertRef>(null)

  React.useEffect(() => {
    fetcher('/user/@me')
      .then((res) => {
        if (res.status === ApiStatus.SUCCESS) {
          userManager.setUser(res.data)
          router.push('/tabs')
        }
      })
      .catch(() => {
        alertRef.current?.openAlert(
          '알림',
          '사용자 정보를 가져오는 중 오류가 발생했습니다.'
        )
      })
  }, [])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+$/
    return emailRegex.test(email)
  }

  const showAlert = (title: string, message: string) => {
    alertRef.current?.openAlert(title, message)
  }

  const login = () => {
    if (!email || !validateEmail(email)) {
      showAlert('알림', '올바른 이메일을 입력해주세요')
      return
    }

    poster(LOGIN_URL, { email: `${email}${EMAIL_DOMAIN}` })
      .then((res) => {
        if (!res || res.status !== ApiStatus.SUCCESS) {
          showAlert('알림', '에러가 발생했어요')
        } else {
          router.push('/authcode')
        }
      })
      .catch(() => {
        showAlert('알림', '서버 요청 중 오류가 발생했습니다.')
      })
  }

  return (
    <Box style={Styles.container}>
      <Alert ref={alertRef} />
      <Heading>로그인</Heading>
      <Input mt={15} mb={15}>
        <InputField
          placeholder="학교 아이디"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputSlot pl={10}>
          <Text>{EMAIL_DOMAIN}</Text>
        </InputSlot>
      </Input>
      <Button onPress={login} style={Styles.Button}>
        <ButtonText>로그인</ButtonText>
      </Button>
    </Box>
  )
}
