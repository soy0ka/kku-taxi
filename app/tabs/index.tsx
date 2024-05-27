import { Box, Card, get, Heading, Text } from '@gluestack-ui/themed'
import React from 'react'
import { getToken } from '../util'

export default function Tab() {
  const [token, setToken] = React.useState('')
  
  React.useEffect(() => {
    const getTokenA = async () => {
      const token = await getToken()
      setToken(token || '')
    }
    getTokenA()
  }
  , [])
  return (
  <Box>
    <Card size="md" variant="elevated" m="$3">
      <Heading mb="$1" size="md">
        텍시팟 구하기
      </Heading>
      <Text size="sm">같이 택시탈 사람을 구해봐요</Text>
      <Text size="sm">현재 토큰: {token}</Text>
    </Card>
  </Box>
  )
}
