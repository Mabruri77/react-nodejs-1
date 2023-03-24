import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { CameraAlt } from "@mui/icons-material"
import Container from "@mui/material/Container"
import { Alert, AlertTitle, Card } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useHttpClient } from "../../shared/hooks/http-hooks"
import { validationRegister } from "../../shared/validationTextField"

export default function SignUp() {
  const [validation, setValidation] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    name: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
  })
  const [imageFile, setImageFile] = useState()
  const navigate = useNavigate()
  const { sendRequest, error, setError } = useHttpClient()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    }
    const { updatedValue, errorValidate } = validationRegister(
      body.name,
      body.email,
      body.password,
      body.confirmPassword,
      data.get("image")
    )
    if (errorValidate) {
      setError("something wrong please check your image")
      setValidation(updatedValue)
    } else {
      try {
        await sendRequest("https://cute-plum-cobra.cyclic.app/api/users/register", "post", data)
        navigate("/login")
      } catch (err) {}
    }
  }

  const pickFileHandler = () => {
    document.getElementById("image").click()
  }

  const readImageFile = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImageFile(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Container sx={{ my: 4, display: "flex", justifyContent: "center" }}>
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            <AlertTitle>Error</AlertTitle>
            {error} — <strong>check it out!</strong>
          </Alert>
        </Container>
      )}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {imageFile && (
          <Avatar sx={{ m: 1, width: 100, height: 100, background: "orange" }} src={imageFile} />
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1 }}>
          <TextField
            error={validation.name.error}
            helperText={validation.name.message}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
          />
          <TextField
            error={validation.email.error}
            helperText={validation.email.message}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            error={validation.password.error}
            helperText={validation.password.message}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            error={validation.confirmPassword.error}
            helperText={validation.confirmPassword.message}
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
          />

          <Button type="button" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={pickFileHandler}>
            Upload <CameraAlt sx={{ ml: 1 }} />
          </Button>
          <TextField
            type="file"
            id="image"
            name="image"
            onChange={readImageFile}
            sx={{ display: "none" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="orange" fontWeight="medium">
                  Already have an account? Sign In
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  )
}
