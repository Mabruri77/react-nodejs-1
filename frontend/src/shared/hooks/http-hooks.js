import axios from "axios"
import { useCallback, useState } from "react"

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  const sendRequest = useCallback(async (url, method = "get", body = {}, head = {}) => {
    try {
      const response = await axios({ method, url, data: body, headers: head })
      return response.data
    } catch (err) {
      var data = err.response ? err.response.data.message : err.message
      setError(data)
      setIsLoading(false)
      throw err
    }
  }, [])

  return { isLoading, error, sendRequest, setIsLoading, setError }
}
