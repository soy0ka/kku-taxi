import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertText,
  Box,
  Button,
  ButtonText,
  Divider,
  Fab,
  FabIcon,
  FabLabel,
  Heading,
} from '@gluestack-ui/themed'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DestinationSelector } from '../../../components/destinationSelector'
import styles from '../../styles'

export default function Create() {
  return (
    <Box style={{ padding: 20 }}>
      <Heading mb={10}>어디로 가시나요?</Heading>
      <DestinationSelector props={{ title: '출발지' }} />
      <Divider mb={10} mt={10} />
      <DestinationSelector props={{ title: '목적지' }} />
      <Button style={styles.Button} mt={20}>
        <ButtonText>출발</ButtonText>
      </Button>
    </Box>
  )
}
