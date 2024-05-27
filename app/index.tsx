import Styles from './styles'
import { Link, router } from 'expo-router'
import { Heading, Input, InputField, Box, Button, ButtonText, InputSlot, Text } from '@gluestack-ui/themed'

export default function index() {
  const login = () => {
    return (
      router.push('authcode')
    )
  }
  return (
    <Box style={Styles.container}>
      <Heading>로그인</Heading>
      <Input mt={15} mb={15}>
        <InputField placeholder="학교 아이디" />
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
