import { Alert, AlertTitle, CircularProgress } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hooks"
import PlaceItem from "../component/PlaceItem"

const MyPlaces = () => {
  const { userId } = useParams()
  const auth = useContext(AuthContext)
  const { sendRequest, error, isLoading, setIsLoading } = useHttpClient()
  const [places, setPlaces] = useState()

  useEffect(() => {
    const fetchPlace = async () => {
      if (userId) {
        const responseData = await sendRequest(
          `https://cute-plum-cobra.cyclic.app/api/places/${userId}`
        )
        setPlaces(responseData)
        setIsLoading(false)
      } else {
        setPlaces([])
      }
    }
    fetchPlace()
  }, [sendRequest, userId, setIsLoading])

  const deleteArrayPlace = (items) => {
    setPlaces(items)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isLoading ? (
        <CircularProgress sx={{ height: 300 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 4, width: "80%" }} variant="filled">
          <AlertTitle>Error</AlertTitle>
          {error} — <strong>check it out!</strong>
        </Alert>
      ) : (
        <PlaceItem
          items={places}
          funcDelete={deleteArrayPlace}
          token={auth.token}
          uid={auth.userId}
        />
      )}
    </div>
  )
}

export default MyPlaces
