import React from 'react'
import styles from '../styles'
import {
  Alert,
  AlertIcon,
  AlertText,
  Box,
  Button,
  ButtonText,
  Divider,
  Heading,
} from '@gluestack-ui/themed'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DestinationSelector } from '../../components/destinationSelector'
import { fetcher } from '../util'

export default function Tab() {
  const [notification, setNotification] = React.useState<any>(null)

  React.useEffect(() => {
    const fetchNotification = async () => {
      const notification = await fetcher('/notice')
      setNotification(notification)
    }
    fetchNotification()
  }, [])

  return (
    <Box>
      {notification && (
        <Alert action="info" variant="accent">
          <AlertIcon as={() => <FontAwesome name="info-circle" size={20} />} />
          <AlertText ml={10}>{notification}</AlertText>
        </Alert>
      )}
      <Box style={{ padding: 20 }}>
        <Heading mb={10}>어디로 가시나요?</Heading>
        <DestinationSelector props={{ title: '출발지' }} />
        <Divider mb={10} mt={10} />
        <DestinationSelector props={{ title: '목적지' }} />
        <Button style={styles.Button} mt={20}>
          <ButtonText>출발</ButtonText>
        </Button>
      </Box>
    </Box>
  )
}
