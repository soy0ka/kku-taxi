import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertText,
  Box,
  Button,
  ButtonText,
  SafeAreaView,
} from '@gluestack-ui/themed'
import styles from '../../styles'
import { router } from 'expo-router'
import { fetcher } from '../../util'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function Home() {
  const [notification, setNotification] = React.useState<any>(null)

  React.useEffect(() => {
    const fetchNotification = async () => {
      const notification = await fetcher('/notice')
      setNotification(notification)
    }
    fetchNotification()
  }, [])

  return (
    <SafeAreaView>
      <Box>
        {notification && (
          <Alert action="info" variant="accent">
            <AlertIcon
              as={() => <FontAwesome name="info-circle" size={20} />}
            />
            <AlertText ml={10}>{notification}</AlertText>
          </Alert>
        )}
        <Box style={{ padding: 20 }}>
          <Button
            style={styles.Button}
            mt={20}
            onPress={() => {
              router.push('/tabs/home/create')
            }}
          >
            <ButtonText>출발</ButtonText>
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  )
}
