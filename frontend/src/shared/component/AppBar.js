import React, { useContext, useState } from "react"
import Box from "@mui/material/Box"
import { Menu as MenuIcon } from "@mui/icons-material"
import { Stack, Button, AppBar, Toolbar, IconButton, Typography, Drawer } from "@mui/material"
import { Link as LinkRouter, useLocation } from "react-router-dom"
import SideDrawer from "./SideDrawer"
import { AuthContext } from "../context/auth-context"

const NavBar = () => {
  const auth = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  function openDrawer() {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }
  const { pathname } = useLocation()

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <Drawer anchor="left" open={open} onClose={openDrawer}>
        <SideDrawer func={openDrawer} />
      </Drawer>
      <AppBar position="relative" sx={{ background: "orange" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your Places
          </Typography>
          <Stack direction="row" sx={{ color: "white", display: { xs: "none", sm: "block" } }}>
            <Button
              LinkComponent={LinkRouter}
              sx={{ background: pathname === "/" ? "black" : "default", mx: 1 }}
              color="inherit"
              variant="text"
              to="/"
            >
              All User
            </Button>
            {auth.isLoggin && (
              <React.Fragment>
                <Button
                  LinkComponent={LinkRouter}
                  color="inherit"
                  sx={{
                    background: pathname.includes("/places") ? "black" : "default",
                    mx: 1,
                  }}
                  variant="text"
                  to={`/${auth.userId}/places`}
                >
                  My Place
                </Button>
                <Button
                  LinkComponent={LinkRouter}
                  sx={{ background: pathname === "/add-places" ? "black" : "default", mx: 1 }}
                  color="inherit"
                  variant="text"
                  to="/add-places"
                >
                  Add Place
                </Button>
              </React.Fragment>
            )}
            {!auth.isLoggin && (
              <Button
                LinkComponent={LinkRouter}
                sx={{ background: pathname === "/login" ? "black" : "default", mx: 1 }}
                color="inherit"
                variant="text"
                to="/login"
              >
                Login
              </Button>
            )}
            {auth.isLoggin && (
              <Button
                LinkComponent={LinkRouter}
                color="inherit"
                variant="outlined"
                to="/login"
                onClick={() => {
                  auth.logout()
                }}
              >
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
