/**
 * API client for backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function post<T>(endpoint: string, data?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

export default post
