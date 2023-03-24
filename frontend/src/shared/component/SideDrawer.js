import React, { useContext } from "react"
import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { AccountBox, Login, AddAPhoto, PhotoAlbum, Logout } from "@mui/icons-material"
import { Link as LinkRouter } from "react-router-dom"
import { AuthContext } from "../context/auth-context"

const SideDrawer = ({ func }) => {
  const auth = useContext(AuthContext)
  return (
    <Box sx={{ minWidth: 250, display: { md: "none" } }}>
      <div style={{ background: "orange", width: "100%", height: 100 }}></div>
      <List>
        <ListItem disablePadding>
          <Button
            sx={{ width: "100%", height: 60 }}
            color="inherit"
            LinkComponent={LinkRouter}
            to="/"
            onClick={func}
          >
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary={"All User"} />
          </Button>
        </ListItem>
        <Divider />
        {auth.isLoggin && (
          <>
            <ListItem disablePadding>
              <Button
                sx={{ width: "100%", height: 60 }}
                color="inherit"
                LinkComponent={LinkRouter}
                to={`${auth.userId}/places`}
                onClick={func}
              >
                <ListItemIcon>
                  <PhotoAlbum />
                </ListItemIcon>
                <ListItemText primary={"Places"} />
              </Button>
            </ListItem>
            <Divider />
          </>
        )}
        {auth.isLoggin && (
          <>
            <ListItem disablePadding>
              <Button
                sx={{ width: "100%", height: 60 }}
                color="inherit"
                LinkComponent={LinkRouter}
                to="/add-places"
                onClick={func}
              >
                <ListItemIcon>
                  <AddAPhoto />
                </ListItemIcon>
                <ListItemText primary={"Add Place"} />
              </Button>
            </ListItem>
            <Divider />
          </>
        )}
        {auth.isLoggin && (
          <>
            <ListItem disablePadding>
              <Button
                sx={{ width: "100%", height: 60 }}
                color="inherit"
                LinkComponent={LinkRouter}
                to="/login"
                onClick={() => {
                  func()
                  auth.logout()
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </Button>
            </ListItem>
            <Divider />
          </>
        )}
        {!auth.isLoggin && (
          <>
            <ListItem disablePadding>
              <Button
                sx={{ width: "100%", height: 60 }}
                color="inherit"
                LinkComponent={LinkRouter}
                to="/login"
                onClick={func}
              >
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </Button>
            </ListItem>
            <Divider />
          </>
        )}
      </List>
    </Box>
  )
}

export default SideDrawer
