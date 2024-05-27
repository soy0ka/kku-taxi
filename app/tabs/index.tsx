import { Box, Card, Heading, Text } from '@gluestack-ui/themed'

export default function Tab() {
  return (
  <Box>
    <Card size="md" variant="elevated" m="$3">
      <Heading mb="$1" size="md">
        텍시팟 구하기
      </Heading>
      <Text size="sm">같이 택시탈 사람을 구해봐요</Text>
    </Card>
  </Box>
  )
}
