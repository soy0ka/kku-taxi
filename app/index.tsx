import React from 'react'
import Styles from './styles'
import { getToken, poster } from './util'
import { router } from 'expo-router'
import { Alert } from '../components/alert'
import { Heading, Input, InputField, Box, Button, ButtonText, InputSlot, Text, set } from '@gluestack-ui/themed'

export default function index() {
  const [token, setToken] = React.useState('')
  const [email, setEmail] = React.useState('')
  const alertRef = React.useRef<any>(null)

  React.useEffect(() => {
    const getTokenA = async () => {
      const token = await getToken()
      setToken(token || '')
    }
    getTokenA()
  }, [])

  React.useEffect(() => {
    if (token) {
      router.push('/tabs')
    }
  }, [token])

  const login = () => {
    if (!email) {
      alertRef.current.openAlert('알림', '이메일을 입력해주세요')
    }
    poster('/auth/login', { email: `${email}@kku.ac.kr` }).then((res) => {
      if (res.success) {
        router.push('/authcode')
      } else {
        alertRef.current.openAlert('알림', '에러가 발생했어요')
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
