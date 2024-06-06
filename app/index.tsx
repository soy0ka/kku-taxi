import React from 'react'
import Styles from './styles'
import { router } from 'expo-router'
import { fetcher, poster } from './util'
import { Alert } from '../components/alert'
import { userManager } from '../utils/localStorage'
import { Heading, Input, InputField, Box, Button, ButtonText, InputSlot, Text, set } from '@gluestack-ui/themed'

export default function index() {
  const [email, setEmail] = React.useState('')
  const alertRef = React.useRef<any>(null)

  React.useEffect(() => {
    fetcher('/auth/me').then((res) => {
      if (!res) return
      if (res.id) {
        userManager.setUser(res)
        router.push('/tabs')
      }
    })
  }, [])

  const login = () => {
    if (!email) {
      alertRef.current.openAlert('알림', '이메일을 입력해주세요')
    }
    poster('/auth/login', { email: `${email}@kku.ac.kr` }).then((res) => {
      if (!res ||!res.success) {
        alertRef.current.openAlert('알림', '에러가 발생했어요')
      } else {
        router.push('/authcode')
      }
    })
  }

  return (
    <Box style={Styles.container}>
      <Alert ref={alertRef} />
      <Heading>로그인</Heading>
      <Input mt={15} mb={15}>
        <InputField placeholder="학교 아이디" value={email} onChangeText={(text) => setEmail(text)} />
        <InputSlot pl={10}>
          <Text>@kku.ac.kr </Text>
        </InputSlot>
      </Input>
      <Button onPress={login} style={Styles.Button}>
        <ButtonText>로그인</ButtonText>
      </Button>
    </Box>
  )
}
