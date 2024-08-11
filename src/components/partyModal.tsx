import { useAlert } from '@/contexts/AlertContext'
import { Party } from '@/types/parties'
import { fetcher } from '@/utils/apiClient'
import { formatRelativeDate, getTimeRemaining } from '@/utils/dateFormatter'
import {
  Button,
  ButtonText,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text
} from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'
import React from 'react'

export type PartyModalRef = {
  // eslint-disable-next-line no-unused-vars
  openModal: (party: Party) => void
  closeModal: () => void
}

export const PartyModal = React.forwardRef<PartyModalRef, object>(
  function AlertComponent(props, ref) {
    const Alert = useAlert()
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState<Party>()
    const router = useRouter()

    React.useImperativeHandle(ref, () => ({
      openModal(party: Party) {
        setData(party)
        setOpen(true)
      },
      closeModal() {
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
          <ModalHeader
            sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Heading size="lg">파티에 참여 하시겠습니까?</Heading>
            <Text size="sm" sx={{ color: 'gray', fontWeight: 'light' }}>
              노쇼 발생시 패널티가 부과됩니다 {'\n'}
              시간과 장소를 잘 확인해주세요
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text>
              모집현황: {'['} {data?._count.partyMemberships} / {data?.maxSize}{' '}
              명 {']'}
            </Text>
            <Text>
              {data?.fromPlace.name}발 {data?.toPlace.name}행
            </Text>
            <Text>
              출발시간: {formatRelativeDate(data?.departure)}
              {' ('}
              {getTimeRemaining(data?.departure)}남음{')'}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              sx={{ width: '$20' }}
              action="secondary"
              mr="$3"
              onPress={() => {
                setOpen(false)
              }}
            >
              <ButtonText>닫기</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              sx={{ width: '$20' }}
              borderWidth="$0"
              onPress={() => {
                if (!data)
                  return Alert.showAlert('에러', '파티 정보가 없습니다.')
                fetcher(`/party/${data.id}/join`)
                setOpen(false)

                // 첫 번째 경로로 이동
                router.push('/tabs/chat')
                setTimeout(() => {
                  router.push(`/tabs/chat/chatroom?id=${data?.id}`)
                }, 200)
              }}
            >
              <ButtonText>참여</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
)
