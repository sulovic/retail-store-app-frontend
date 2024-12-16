'use client' // Error boundaries must be Client Components
import { handleApiError } from '@/services/errorHandler' 
import { useEffect } from 'react'
import Toast from '@/components/Toast'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    const errorMessage = handleApiError(error)
    Toast({ errorMessage })
    reset()
    
  }, [error])
 
  return null
}