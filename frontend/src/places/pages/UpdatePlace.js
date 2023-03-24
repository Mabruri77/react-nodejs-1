import React, { useContext } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Alert, AlertTitle, Card } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useHttpClient } from "../../shared/hooks/http-hooks"
import { AuthContext } from "../../shared/context/auth-context"

export default function EditPlace() {
  const { placeId } = useParams()
  const navigate = useNavigate()
  const { sendRequest, error } = useHttpClient()
  const auth = useContext(AuthContext)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const body = {
      title: data.get("title"),
      description: data.get("description"),
    }
    try {
      await sendRequest(`https://cute-plum-cobra.cyclic.app/api/places/${placeId}`, "patch", body, {
        Authorization: `Bearer ${auth.token}`,
      })
      navigate(`/${auth.userId}/places`)
    } catch (err) {}
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
      <Container component="main" maxWidth="sm">
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h4" fontWeight="bold">
            Update Place
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "80%" }}>
            <Typography variant="body1" fontWeight="bold">
              Title
            </Typography>
            <TextField margin="normal" required fullWidth id="title" name="title" />

            <Typography variant="body1" fontWeight="bold">
              description
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              id="description"
              multiline
              rows={4}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
            >
              Save
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  )
}
