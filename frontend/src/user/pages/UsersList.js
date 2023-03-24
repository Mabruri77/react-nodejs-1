import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material"

import React, { useEffect, useState } from "react"
import { useHttpClient } from "../../shared/hooks/http-hooks"
import UsersItem from "../components/UsersItem"

const Users = () => {
  const { isLoading, error, sendRequest, setIsLoading } = useHttpClient()
  const [users, setUsers] = useState()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(`https://cute-plum-cobra.cyclic.app/api/users`)

        setUsers(responseData.users)
        setIsLoading(false)
      } catch (err) {}
    }
    fetchUser()
  }, [sendRequest, setIsLoading])

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress sx={{ height: 300 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 4, width: "80%" }} variant="filled">
          <AlertTitle>Error</AlertTitle>
          {error} — <strong>check it out!</strong>
        </Alert>
      ) : (
        <UsersItem user={users} />
      )}
    </Box>
  )
}

export default Users
