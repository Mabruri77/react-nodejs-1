import { CircularProgress } from "@mui/material"
import React, { useEffect, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppBar from "./shared/component/AppBar.js"
import { AuthContext } from "./shared/context/auth-context"
import { useAuthHooks } from "./shared/hooks/auth-hooks"
const MyPlaces = React.lazy(() => import("./places/pages/MyPlaces"))
const NewPlaces = React.lazy(() => import("./places/pages/NewPlaces"))
const EditPlace = React.lazy(() => import("./places/pages/UpdatePlace"))
const SignIn = React.lazy(() => import("./user/pages/userLogin"))
const SignUp = React.lazy(() => import("./user/pages/userRegister"))
const Users = React.lazy(() => import("./user/pages/UsersList"))

const App = () => {
  const { userId, token, login, logout, checkTokenExpired } = useAuthHooks()
  useEffect(() => {
    checkTokenExpired()
  }, [checkTokenExpired])
  return (
    <AuthContext.Provider value={{ userId, isLoggin: !!token, token, login, logout }}>
      <Router>
        <AppBar />
        <Suspense
          fallback={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          }
        >
          <main>
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/:userId/places" element={<MyPlaces />} />
              <Route path="/:placeId/editPlaces" element={<EditPlace />} />
              <Route path="/add-places" element={<NewPlaces />} />
            </Routes>
          </main>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
