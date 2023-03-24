import { useCallback, useState } from "react"
import jwtDecode from "jwt-decode"

export const useAuthHooks = () => {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)
  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
    localStorage.setItem("userData", JSON.stringify({ userId: uid, token }))
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem("userData")
  }, [])
  const checkTokenExpired = useCallback(() => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    if (userData) {
      const userToken = userData.token
      const decode = jwtDecode(userToken)
      if (new Date(decode.exp * 1000) > new Date()) {
        login(userData.userId, userData.token)
      } else {
        logout()
      }
    }
  }, [login, logout])
  return { token, userId, login, logout, checkTokenExpired }
}
