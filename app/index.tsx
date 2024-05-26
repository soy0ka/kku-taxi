import Styles from './styles'
import { Link, router } from 'expo-router'
import { Heading, Input, InputField, Box, Button, ButtonText } from '@gluestack-ui/themed'

export default function index() {
  const login = () => {
    return (
      router.push('tabs')
    )
  }
  return (
    <Box style={Styles.MiddleContainer.container}>
      <Heading style={{ fontSize: '36px' }}>로그인</Heading>
      <Input m={10}>
        <InputField placeholder="학교 이메일" />
      </Input>
      <Button onPress={login}>
        <ButtonText>로그인</ButtonText>
      </Button>
    </Box>
  )
}
