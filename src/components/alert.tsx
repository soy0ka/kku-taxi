import {
  Button,
  ButtonText,
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
  Text
} from '@gluestack-ui/themed'
import React from 'react'

export type AlertRef = {
  // eslint-disable-next-line no-unused-vars
  openAlert: (alertTitle: string, alertMessage: string) => void
  closeAlert: () => void
}
export const Alert = React.forwardRef<AlertRef, object>(
  function AlertComponent(props, ref) {
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState({ title: '', message: '' })

    const closeAlert = () => setOpen(false)

    React.useImperativeHandle(ref, () => ({
      openAlert(alertTitle: string, alertMessage: string) {
        setData({ title: alertTitle, message: alertMessage })
        setOpen(true)
      },
      closeAlert
    }))

    return (
      <Modal isOpen={open} onClose={closeAlert}>
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
              onPress={closeAlert}
            >
              <ButtonText>확인</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
)
