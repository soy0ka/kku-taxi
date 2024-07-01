import {
  Button,
  ButtonText,
  Center,
  Heading,
  HStack,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import React from 'react'
import styles from '../app/styles'
import { poster } from '../app/util'

interface BankAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BankAccountModal: React.FC<BankAccountModalProps> = (props) => {
  const [showModal, setShowModal] = React.useState(false)
  const [bank, setBank] = React.useState('')
  const [account, setAccount] = React.useState('')
  const [owner, setOwner] = React.useState('')
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    setShowModal(props.isOpen)
  }, [props.isOpen])

  const handleBankAccountChange = () => {
    if (!bank || !account || !owner) return setError('모든 정보를 입력해주세요')
    poster('/auth/account', {
      bank: bank,
      number: account,
      holder: owner,
    }).then((res) => {
      if (res.success) {
        props.onClose()
        setShowModal(false)
      } else {
        setError('계좌 정보를 확인해주세요')
      }
    })
  }

  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          props.onClose()
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader borderBottomWidth="$0">
            <VStack space="sm">
              <Heading size="lg">계좌정보 변경하기</Heading>
              <Text size="sm">
                이 정보는 정산시 다른 이용자들에게 표시됩니다
              </Text>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <Input mt="$1.5">
              <InputField
                onChangeText={(text) => setBank(text)}
                placeholder="은행명"
              />
            </Input>
            <Input mt="$1.5">
              <InputField
                onChangeText={(text) => setAccount(text)}
                placeholder="계좌번호"
              />
            </Input>
            <Input mt="$1.5">
              <InputField
                onChangeText={(text) => setOwner(text)}
                placeholder="예금주"
              />
            </Input>
          </ModalBody>
          <ModalFooter borderTopWidth="$0">
            <VStack space="lg" w="$full">
              {error && (
                <Text size="sm" color="red">
                  {error}
                </Text>
              )}
              <Button
                sx={styles.Button}
                onPress={() => handleBankAccountChange()}
              >
                <ButtonText>변경</ButtonText>
              </Button>
              <HStack></HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}
