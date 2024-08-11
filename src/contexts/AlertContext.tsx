import { Alert, AlertRef } from '@/components/alert'
import React, { createContext, ReactNode, useContext, useRef } from 'react'

type AlertContextType = {
  // eslint-disable-next-line no-unused-vars
  showAlert: (alertTitle: string, alertMessage: string) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

interface AlertProviderProps {
  children: ReactNode
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const alertRef = useRef<AlertRef>(null)

  const showAlert = (alertTitle: string, alertMessage: string) => {
    alertRef.current?.openAlert(alertTitle, alertMessage)
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert ref={alertRef} />
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}
