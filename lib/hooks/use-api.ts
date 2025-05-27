"use client"

import { useState, useEffect, useCallback } from "react"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

export function useApi<T>(apiFunction: () => Promise<T>, dependencies: any[] = [], options: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const result = await apiFunction()
      setState({ data: result, loading: false, error: null })
      options.onSuccess?.(result)
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      setState({ data: null, loading: false, error: errorMessage })
      options.onError?.(errorMessage)
      throw error
    }
  }, dependencies)

  useEffect(() => {
    if (options.immediate !== false) {
      execute()
    }
  }, dependencies)

  return {
    ...state,
    execute,
    refetch: execute,
  }
}

// Specific hooks for common operations
export function useColleges(filters?: any) {
  return useApi(
    () => fetch(`/api/colleges?${new URLSearchParams(filters)}`).then((res) => res.json()),
    [JSON.stringify(filters)],
  )
}

export function useCourses(filters?: any) {
  return useApi(
    () => fetch(`/api/courses?${new URLSearchParams(filters)}`).then((res) => res.json()),
    [JSON.stringify(filters)],
  )
}

export function useCollege(id: string) {
  return useApi(() => fetch(`/api/colleges/${id}`).then((res) => res.json()), [id])
}
