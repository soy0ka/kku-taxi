import { Alert, AlertRef } from '@/src/components/alert'
import { ApiStatus } from '@/src/types/api'
import { poster } from '@/src/utils/apiClient'
import { tokenManager } from '@/src/utils/localStorage'
import {
  Box,
  Button,
  ButtonText,
  Heading,
  Input,
  InputField,
  Text,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import React from 'react'
import Styles from './styles'

export default function AuthCodeScreen() {
  const [code, setCode] = React.useState('')
  const alertRef = React.useRef<AlertRef>(null)

  function confirm() {
    if (!code)
      return alertRef.current?.openAlert(
        '인증코드를 입력해주세요',
        '인증코드는 6자리 숫자로 이루어져있습니다'
      )
    poster('/auth/code', { code }).then((res) => {
      if (res.status === ApiStatus.SUCCESS) {
        tokenManager.setToken(res.data.token)
        router.push('/tabs')
      } else {
        if (res.error?.code === 'C101') {
          alertRef.current?.openAlert(
            '인증코드가 틀렸어요',
            '인증코드를 다시 확인해주세요'
          )
        } else if (res.error?.code === 'C102') {
          alertRef.current?.openAlert(
            '인증코드가 만료되었어요',
            '인증코드는 5분간 유효해요'
          )
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
          keyboardType="numeric"
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
