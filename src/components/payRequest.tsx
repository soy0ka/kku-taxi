import styles from '@/app/styles'
import { useAlert } from '@/contexts/AlertContext'
import { Party } from '@/types/parties'
import { poster } from '@/utils/apiClient'
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
  VStack
} from '@gluestack-ui/themed'
import React from 'react'

interface PayRequestModalProps {
  isOpen: boolean
  party: Party | undefined
  onClose: () => void
}

export const PayRequestModal: React.FC<PayRequestModalProps> = (props) => {
  const { showAlert } = useAlert()
  const [showModal, setShowModal] = React.useState(false)
  const [fee, setFee] = React.useState<number>(0)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    setShowModal(props.isOpen)
  }, [props.isOpen])

  const handlePayRequest = async (fee: number) => {
    if (!props.party) return
    const memberCount = props.party._count.partyMemberships
    const price = fee / memberCount
    const celiPrice = Math.ceil(price)

    const response = await poster(`/party/${props.party.id}/pay`, {
      totalPrice: fee,
      price: celiPrice
    })
    if (response.error) {
      showAlert('에러', String(response.error.message))
    }
    setShowModal(false)
    props.onClose()
  }

  React.useEffect(() => {
    if (isNaN(fee)) {
      setError('숫자만 입력해주세요.')
    } else if (fee < 0) {
      setError('요금은 0보다 작을 수 없습니다.')
    } else {
      setError('')
    }
  }, [fee])

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
              <Heading size="lg">정산 요청하기</Heading>
              <Text size="sm">정산 요청을 위해 택시요금을 입력해주세요.</Text>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <Input mt="$1.5">
              <InputField
                keyboardType="numeric"
                onChangeText={(text) => setFee(parseInt(text))}
                placeholder="택시요금"
              />
            </Input>
            {error && (
              <Text size="sm" color="red">
                {error}
              </Text>
            )}
          </ModalBody>
          <ModalFooter borderTopWidth="$0">
            <VStack space="lg" w="$full">
              <Button
                sx={styles.Button}
                isDisabled={!fee || !!error}
                onPress={() => handlePayRequest(fee)}
              >
                <ButtonText>정산</ButtonText>
              </Button>
              <HStack></HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}
