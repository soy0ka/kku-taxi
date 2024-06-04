import React from 'react'
import {
  Box,
  Button,
  ButtonText,
  Divider,
  Heading,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Textarea,
  TextareaInput,
  HStack,
  Text,
  ScrollView,
} from '@gluestack-ui/themed'
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker'
import { DestinationSelector } from '../../../components/destinationSelector'
import styles from '../../styles'
import { Platform } from 'react-native'
import { poster } from '../../util'
import { Alert } from '../../../components/alert'
import { router } from 'expo-router'
import EasterEgg from '../../../utils/easterEgg'

export default function Create() {
  const alertRef = React.useRef<any>(null)
  const [date, setDate] = React.useState(new Date())
  const [departure, setDeparture] = React.useState(0)
  const [arrival, setArrival] = React.useState(0)
  const [maxSize, setMaxSize] = React.useState(0)
  const [description, setDescription] = React.useState('')
  const [pressCount, setPressCount] = React.useState(0)

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`
  }

  const handleSubmit = async () => {
    if (!departure || !arrival) return alertRef.current.openAlert('에러', '출발지와 목적지를 선택해주세요')
    if (departure === arrival) {
      alertRef.current.openAlert('에러', EasterEgg.ArrivalAndDestinationsAreSame(pressCount))
      return setPressCount(pressCount + 1)
    }
    if (!maxSize) return alertRef.current.openAlert('에러', '모집인원을 선택해주세요')
    if (date < new Date()) return alertRef.current.openAlert('에러', '출발시간은 현재 시간보다 이후여야합니다')

    const response = await poster('/party/create', {
      description: description || '셜명이 없습니다',
      dateTime: date,
      departure,
      arrival,
      maxSize
    })
    if (!response.success){
      alertRef.current.openAlert('error', response.message)
    } else {
      alertRef.current.openAlert('success', '팟이 생성되었습니다.')
      router.push('home')
    }
  }

  return (
    <Box style={{ padding: 20 }}>
      <Alert ref={alertRef} />
      <ScrollView>
        <Heading mb={10}>어디로 가시나요?</Heading>
        <DestinationSelector props={{ title: '출발지' }} onChange={(value) => setDeparture(value)} />
        <Divider mb={10} mt={10} />
        <DestinationSelector props={{ title: '목적지' }} onChange={(value) => setArrival(value)} />
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
                  minimumDate: new Date(),
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
                  display: 'spinner',
                })
              }
              style={{ ...styles.Button, width: '49%' }}
            >
              <ButtonText>시간 선택</ButtonText>
            </Button>
          </HStack>
        )}
        <Text textAlign="center" mt={10} fontSize={18}>
          시간: {formatDate(date)}
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
