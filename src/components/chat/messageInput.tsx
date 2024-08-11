import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField
} from '@gluestack-ui/themed'
import React from 'react'

interface MessageInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  handleSend: () => void
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  setValue,
  handleSend
}) => {
  return (
    <Box
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
      <Input variant="outline" size="md" style={{ flex: 1 }}>
        <InputField value={value} onChangeText={(text) => setValue(text)} />
      </Input>
      <Button
        size="md"
        variant="solid"
        style={{
          backgroundColor: '#036B3F',
          marginLeft: 10
        }}
        isDisabled={!value}
        onPress={handleSend}
      >
        <ButtonText>전송</ButtonText>
      </Button>
    </Box>
  )
}

export default MessageInput
