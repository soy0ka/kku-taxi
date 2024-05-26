import Styles from './styles'
import { Link, router } from 'expo-router'
import { Heading, Input, InputField, Box, Button, ButtonText } from '@gluestack-ui/themed'

export default function index() {
  const login = () => {
    return (
      router.push('authcode')
    )
  }
  return (
    <Box style={Styles.container}>
      <Heading style={{ fontSize: '36px' }}>로그인</Heading>
      <Input mb={10} mt={20}>
        <InputField placeholder="학교 이메일" />
      </Input>
      <Button onPress={login} style={Styles.Button}>
        <ButtonText>로그인</ButtonText>
      </Button>
    </Box>
  )
}
