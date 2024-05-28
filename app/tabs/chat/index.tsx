import React from 'react'
import styles from '../../styles'
import {
  Avatar,
  AvatarFallbackText,
  Card,
  Heading,
  HStack,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
        {new Array(100).fill(0).map((_, i) => (
          <Pressable onPress={() => router.push('/tabs/chat/chatroom')} key={i} mt={10}>
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
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
