import { useRuntimeConfig } from '#imports'

export function useApiConfig() {
  const config = useRuntimeConfig()
  const useLocalApi = config.public.useLocalApi === true || config.public.useLocalApi === 'true'
  const baseUrl = config.public.localApiBase || 'http://localhost:4000'
  return { useLocalApi, baseUrl }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const { baseUrl } = useApiConfig()
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  })

  if (!res.ok) {
    const message = await res.text()
    throw new Error(message || `Request failed: ${res.status}`)
  }

  return res.json() as Promise<T>
}
