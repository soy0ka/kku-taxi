import {
  Button,
  ButtonText,
  Center,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@gluestack-ui/themed'
import React from 'react'

export const Alert = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({ title: '', message: '' })

  React.useImperativeHandle(ref, () => ({
    openAlert(alertTitle: string, alertMessage: string) {
      setData({ title: alertTitle, message: alertMessage })
      setOpen(true)
    },
    closeAlert() {
      setOpen(false)
    }
  }))

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        setOpen(false)
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{data.title}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>{data.message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {setOpen(false)}}
          >
            <ButtonText>확인</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})
