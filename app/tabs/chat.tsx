import React from 'react'
import {
  Box,
  Text,
  Heading,
  Card,
  Avatar,
  AvatarFallbackText,
  HStack,
} from '@gluestack-ui/themed'
import styles from '../styles'

export default function Chat() {
  return (
    <Box style={{ padding: 20 }}>
      <Card>
        <HStack style={{ alignItems: 'center' }}>
          <Avatar size="md" borderRadius="$full">
            <AvatarFallbackText>고독한 카피바라</AvatarFallbackText>
          </Avatar>
          <Heading ml={10} size="lg">
            고독한 카피바라의 택시팟
          </Heading>
        </HStack>
        <Text size="sm">2024-05-28 | 건국대학교정문 - 충주역</Text>
        <Text size="sm">총 인원: 4명</Text>
      </Card>
    </Box>
  )
}
