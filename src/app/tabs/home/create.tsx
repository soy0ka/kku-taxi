import styles from '@/app/styles'
import { DestinationSelector } from '@/components/destinationSelector'
import { useAlert } from '@/contexts/AlertContext'
import { ApiStatus } from '@/types/api'
import { poster } from '@/utils/apiClient'
import { formatDateToKorean } from '@/utils/dateFormatter'
import EasterEgg from '@/utils/easterEgg'
import {
  Box,
  Button,
  ButtonText,
  Divider,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  HStack,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  Textarea,
  TextareaInput
} from '@gluestack-ui/themed'
import RNDateTimePicker, {
  DateTimePickerAndroid
} from '@react-native-community/datetimepicker'
import { router } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

export default function Create() {
  const { showAlert } = useAlert()
  const [date, setDate] = React.useState(new Date())
  const [departure, setDeparture] = React.useState(0)
  const [arrival, setArrival] = React.useState(0)
  const [maxSize, setMaxSize] = React.useState(0)
  const [description, setDescription] = React.useState('')
  const [pressCount, setPressCount] = React.useState(0)

  const handleSubmit = async () => {
    if (!departure || !arrival)
      return showAlert('에러', '출발지와 목적지를 선택해주세요')
    if (departure === arrival) {
      showAlert('에러', EasterEgg.ArrivalAndDestinationsAreSame(pressCount))
      return setPressCount(pressCount + 1)
    }
    if (!maxSize) return showAlert('에러', '모집인원을 선택해주세요')
    if (date < new Date())
      return showAlert('에러', '출발시간은 현재 시간보다 이후여야합니다')

    const response = await poster('/party', {
      description: description || '설명이 없습니다',
      dateTime: date,
      departure,
      arrival,
      maxSize
    })

    if (response.status === ApiStatus.ERROR) {
      showAlert('에러', String(response.error?.message))
    } else {
      console.log(response)
      showAlert('성공', '팟이 생성되었습니다.')
      router.push(`/tabs/chat/chatroom?id=${response.data.chatRoomId}`)
    }
  }

  return (
    <Box style={{ padding: 20 }}>
      <ScrollView>
        <Heading mb={10}>어디로 가시나요?</Heading>
        <DestinationSelector
          props={{ title: '출발지' }}
          onChange={(value) => setDeparture(value + 1)}
        />
        <Divider mb={10} mt={10} />
        <DestinationSelector
          props={{ title: '목적지' }}
          onChange={(value) => setArrival(value + 1)}
        />
        {Platform.OS === 'ios' ? (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(_, selectedDate) => setDate(selectedDate || date)}
            value={date}
            locale="ko-KR"
            mode="datetime"
            style={{ marginTop: 10 }}
          />
        ) : (
          <HStack mt={10}>
            <Button
              borderRadius="$lg"
              onPress={() =>
                DateTimePickerAndroid.open({
                  value: date,
                  mode: 'date',
                  onChange: (_, selectedDate) => setDate(selectedDate || date),
                  minimumDate: new Date()
                })
              }
              style={{ ...styles.Button, width: '49%', marginRight: 'auto' }}
            >
              <ButtonText>날짜 선택</ButtonText>
            </Button>
            <Button
              borderRadius="$lg"
              onPress={() =>
                DateTimePickerAndroid.open({
                  value: date,
                  mode: 'time',
                  onChange: (_, selectedDate) => setDate(selectedDate || date),
                  minimumDate: new Date(),
                  display: 'spinner'
                })
              }
              style={{ ...styles.Button, width: '49%' }}
            >
              <ButtonText>시간 선택</ButtonText>
            </Button>
          </HStack>
        )}
        <Text textAlign="center" mt={10} fontSize={18}>
          시간: {formatDateToKorean(date)}
        </Text>
        <FormControl mt={20}>
          <FormControlLabel mb="$1">
            <FormControlLabelText>모집인원</FormControlLabelText>
          </FormControlLabel>
          <Select onValueChange={(value) => setMaxSize(Number(value))}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="0명" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {new Array(4).fill(0).map((_, i) => (
                  <SelectItem
                    key={i}
                    value={String(i + 1)}
                    label={`${i + 1}명`}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
          <Textarea size="md" mt={10}>
            <TextareaInput
              value={description}
              onChangeText={(newValue) => {
                setDescription(newValue)
              }}
              placeholder="설명글 (하고싶은 말을 추가해주세요)"
            />
          </Textarea>
        </FormControl>
        <Button style={styles.Button} mt={20} onPress={handleSubmit}>
          <ButtonText>만들기</ButtonText>
        </Button>
      </ScrollView>
    </Box>
  )
}
