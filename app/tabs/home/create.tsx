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

export default function Create() {
  const [date, setDate] = React.useState(new Date())

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`
  }

  return (
    <Box style={{ padding: 20 }}>
      <ScrollView>
        <Heading mb={10}>어디로 가시나요?</Heading>
        <DestinationSelector props={{ title: '출발지' }} />
        <Divider mb={10} mt={10} />
        <DestinationSelector props={{ title: '목적지' }} />
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
          <Select>
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
            <TextareaInput placeholder="설명글 (하고싶은 말을 추가해주세요)" />
          </Textarea>
        </FormControl>
        <Button style={styles.Button} mt={20}>
          <ButtonText>만들기</ButtonText>
        </Button>
      </ScrollView>
    </Box>
  )
}
