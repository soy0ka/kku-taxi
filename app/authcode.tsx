import React from 'react'
import Styles from './styles'
import { Box, Button, ButtonText, Text, Input, InputField, Heading, InputSlot } from '@gluestack-ui/themed'
import { router } from 'expo-router'

export default function AuthCodeScreen() {
  function confirm() {
    return (
      router.push('tabs')
    )
  }
  return (
    <Box style={Styles.container}>
      <Heading fontSize={24} mb={5}>인증코드 입력</Heading>
      <Text> 학교 이메일로 인증코드를 보내드렸어요!</Text>
      <Input>
        <InputField placeholder="인증코드" />
      </Input>
      <Button style={Styles.Button} mt={10} onPress={confirm}>
        <ButtonText>확인</ButtonText>
      </Button>
    </Box>
  )
}