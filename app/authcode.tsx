import React from 'react'
import {
  Box,
  Button,
  ButtonText,
  Text,
  Input,
  InputField,
  Heading,
} from '@gluestack-ui/themed'
import Styles from './styles'
import { poster } from './util'
import { router } from 'expo-router'
import { Alert } from '../components/alert'
import { tokenManager } from '../utils/localStorage'

export default function AuthCodeScreen() {
  const [code, setCode] = React.useState('')
  const alertRef = React.useRef<any>(null)
  
  function confirm() {
    if (!code) return alertRef.current.openAlert('인증코드를 입력해주세요', '인증코드는 6자리 숫자로 이루어져있습니다')
    poster('/auth/code', { code }).then((res) => {
      if (res.success) {
        tokenManager.setToken(res.body.token)
        router.push('/tabs')
      } else {
        if (res.message === 'Forbidden') {
          alertRef.current.openAlert('인증코드가 만료되었어요', '인증코드는 5분간 유효해요')
        } else {
          alertRef.current.openAlert('인증코드가 틀렸어요', '인증코드를 다시 확인해주세요')
        }
      }
    })
  }

  return (
    <Box style={Styles.container}>
      <Alert ref={alertRef} />
      <Heading fontSize={24} mb={5}>
        인증코드 입력
      </Heading>
      <Text> 학교 이메일로 인증코드를 보내드렸어요!</Text>
      <Input>
        <InputField
          value={code}
          onChangeText={setCode}
          placeholder="인증코드"
        />
      </Input>
      <Button style={Styles.Button} mt={10} onPress={confirm}>
        <ButtonText>확인</ButtonText>
      </Button>
    </Box>
  )
}
