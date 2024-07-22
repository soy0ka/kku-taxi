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
  Text,
} from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'
import React from 'react'
import { fetcher } from '../app/util'
import { Party } from '../types/parties'

const formatDate = (date: string | undefined) => {
  if (!date) return '불러올 수 없음'
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const diffHours = diff / (1000 * 60 * 60)
  const diffDays = diffHours / 24
  if (diffDays < 1) {
    return `${d.getHours()}시 ${d.getMinutes()}분`
  } else {
    return `${d.getMonth() + 1}월 ${d.getDate()}일`
  }
}

const timeRemain = (date: string | undefined) => {
  if (!date) return '불러올 수 없음'
  const d = new Date(date)
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  const diffHours = diff / (1000 * 60 * 60)
  const diffMinutes = (diffHours % 1) * 60
  if (diffHours < 12) {
    return `${Math.floor(diffHours)}시간 ${Math.floor(diffMinutes)}분`
  } else {
    return `${Math.floor(diffHours / 24)}일`
  }
}

export type PartyModalRef = {
  openModal: (party: Party) => void
  closeModal: () => void
}

export const PartyModal = React.forwardRef<PartyModalRef, object>(
  function AlertComponent(props, ref) {
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
      },
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
              출발시간: {formatDate(data?.departure)}
              {' ('}
              {timeRemain(data?.departure)}남음{')'}
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
                fetcher(`/party/join/${data?.id}`)
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
