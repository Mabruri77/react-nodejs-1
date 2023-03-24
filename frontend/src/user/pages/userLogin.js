import React, { useContext, useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Alert, AlertTitle, Card } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useHttpClient } from "../../shared/hooks/http-hooks"
import { AuthContext } from "../../shared/context/auth-context"
import { validationLogin } from "../../shared/validationTextField"

export default function SignIn() {
  const navigate = useNavigate()
  const [validation, setValidation] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  })
  const { sendRequest, error } = useHttpClient()
  const auth = useContext(AuthContext)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    }
    const { updatedValue, errorValidate } = validationLogin(body.email, body.password)
    if (errorValidate) {
      setValidation(updatedValue)
    } else {
      setValidation(updatedValue)
      try {
        const responseData = await sendRequest(
          "https://cute-plum-cobra.cyclic.app/api/users/login",
          "post",
          body
        )
        navigate("/")
        auth.login(responseData.userId, responseData.token)
      } catch (err) {}
    }
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
      <Container component="main" maxWidth="xs">
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "orange" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1 }}>
            <TextField
              error={validation.email.error}
              helperText={validation.email.message}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="orange" fontWeight="medium">
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  )
}
