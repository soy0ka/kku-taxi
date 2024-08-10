import { useAlert } from '@/contexts/AlertContext'
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<
  Record<string, never>,
  ErrorBoundaryState
> {
  constructor(props: Record<string, never>) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  private static _alert = useAlert()
  private static _showAlert = (title: string, message: string) => {
    this._alert.showAlert(title, message)
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary: ', error, info)
  }

  render() {
    if (this.state.hasError) {
      ErrorBoundary._showAlert('에러 발생', JSON.stringify(this.state.error))
      return null
    }

    return this.props.children
  }
}

export default ErrorBoundary
