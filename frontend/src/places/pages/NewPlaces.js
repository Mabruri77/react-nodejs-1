import React, { useContext, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Alert, AlertTitle, Card, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useHttpClient } from "../../shared/hooks/http-hooks"
import { AuthContext } from "../../shared/context/auth-context"
import { validationTexfieldAddPlace } from "../../shared/validationTextField"

export default function NewPlaces() {
  const [file, setFile] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [validation, setValidation] = useState({
    title: {
      error: false,
      message: "",
    },
    address: {
      error: false,
      message: "",
    },
    description: {
      error: false,
      message: "",
    },
  })
  const navigate = useNavigate()
  const { sendRequest, error, setError } = useHttpClient()
  const auth = useContext(AuthContext)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const { updatedValue, errorValidate } = validationTexfieldAddPlace(
      data.get("title"),
      data.get("address"),
      data.get("description"),
      data.get("image")
    )
    if (errorValidate) {
      setError("something wrong please check your image")
      setValidation(updatedValue)
    } else {
      try {
        setIsLoading(true)
        await sendRequest("https://cute-plum-cobra.cyclic.app/api/places", "post", data, {
          Authorization: `Bearer ${auth.token}`,
        })
        navigate(`/${auth.userId}/places`)
        setIsLoading(false)
      } catch (err) {}
    }
  }

  const pickHandler = (event) => {
    const fileImage = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setFile(reader.result)
    }
    reader.readAsDataURL(fileImage)
  }
  return (
    <>
      {error && (
        <Container sx={{ my: 4, display: "flex", justifyContent: "center" }}>
          <Alert severity="error" variant="filled" sx={{ width: "40%" }}>
            <AlertTitle>Error</AlertTitle>
            {error} — <strong>check it out!</strong>
          </Alert>
        </Container>
      )}
      {isLoading ? (
        <Container sx={{ my: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Container>
      ) : (
        <Container component="main" maxWidth="sm">
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h4" fontWeight="bold">
              Add Place
            </Typography>
            {file && <img src={file} alt="" height={200} />}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "80%" }}>
              <Typography variant="body1" fontWeight="bold">
                Title
              </Typography>
              <TextField
                error={validation.title.error}
                helperText={validation.title.message}
                margin="normal"
                required
                fullWidth
                id="title"
                name="title"
              />
              <Typography variant="body1" fontWeight="bold">
                Address
              </Typography>
              <TextField
                error={validation.address.error}
                helperText={validation.address.message}
                margin="normal"
                required
                fullWidth
                name="address"
                id="address"
              />
              <Typography variant="body1" fontWeight="bold">
                description
              </Typography>
              <TextField
                error={validation.description.error}
                helperText={validation.description.message}
                margin="normal"
                required
                fullWidth
                name="description"
                id="description"
                multiline
                rows={4}
              />
              <TextField type="file" id="image" name="image" onChange={pickHandler} />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
              >
                Create Place
              </Button>
            </Box>
          </Card>
        </Container>
      )}
    </>
  )
}
