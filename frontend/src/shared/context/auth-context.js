import { createContext } from "react"

export const AuthContext = createContext({
  isLoggin: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
})
