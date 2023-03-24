import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useHttpClient } from "../../shared/hooks/http-hooks"
import AlertModal from "./AlertModal"
import MyModal from "./MyModal"

const PlaceItem = ({ items, funcDelete, token, uid }) => {
  const { sendRequest, isLoading, setIsLoading } = useHttpClient()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [value, setValue] = useState(items[0])
  function openModal(val) {
    if (open) {
      setOpen(false)
    } else {
      setValue(val)
      setOpen(true)
    }
  }
  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  async function deleteItem(id, token) {
    setIsLoading(true)
    await sendRequest(`https://cute-plum-cobra.cyclic.app/api/places/${id}`, "delete", null, {
      Authorization: `Bearer ${token}`,
    })
    items = items.filter((el) => el._id !== id)
    funcDelete(items)
    setIsLoading(false)
  }
  function openAlert(val) {
    if (alertOpen) {
      setAlertOpen(false)
    } else {
      setValue(val)
      setAlertOpen(true)
    }
  }
  if (isLoading) {
    return <CircularProgress sx={{ height: 300 }} />
  }
  return (
    <Stack direction="column">
      <MyModal
        func={openModal}
        open={open}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        data={value}
      />
      {value && (
        <AlertModal
          func={openAlert}
          open={alertOpen}
          val={value}
          okfunc={() => {
            deleteItem(value._id, token)
            openAlert()
          }}
        />
      )}
      {items.map((val) => {
        return (
          <Container key={val._id} maxWidth="sm">
            <Card sx={{ mb: 2, textAlign: "center" }}>
              <CardMedia sx={{ height: 300 }} image={val.imageUrl} title="green iguana" />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                  {val.title}
                </Typography>
                <Typography gutterBottom component="div" fontWeight="bold">
                  {val.address}
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 500 }}>
                  {val.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    openModal(val)
                  }}
                >
                  View On Map
                </Button>
                {uid && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(`/${val._id}/editPlaces`)
                    }}
                  >
                    Edit
                  </Button>
                )}
                {uid && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      openAlert(val)
                    }}
                  >
                    delete
                  </Button>
                )}
              </CardActions>
            </Card>
          </Container>
        )
      })}
    </Stack>
  )
}

export default PlaceItem
