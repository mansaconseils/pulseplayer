import { useState, useEffect } from "react"
import { toast } from "sonner"

interface UseApiQueryOptions<T> {
  queryFn: () => Promise<T>
  enabled?: boolean
  refreshInterval?: number
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useApiQuery<T>({
  queryFn,
  enabled = true,
  refreshInterval,
  onSuccess,
  onError,
}: UseApiQueryOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    async function fetchData() {
      if (!enabled) return

      setIsLoading(true)
      try {
        const result = await queryFn()
        setData(result)
        setError(null)
        onSuccess?.(result)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An error occurred")
        setError(error)
        onError?.(error)
        toast.error("Failed to fetch data", {
          description: error.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    if (refreshInterval) {
      intervalId = setInterval(fetchData, refreshInterval)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [enabled, queryFn, refreshInterval])

  return { data, isLoading, error }
}