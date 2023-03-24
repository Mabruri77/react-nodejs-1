import { Alert, Button, Card, CardActions, Container, Modal, Typography } from "@mui/material"
import { Box } from "@mui/system"
import ReactMapGl, { Marker } from "react-map-gl"
import React from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from "mapbox-gl"

const MyModal = ({ func, open, data }) => {
  // eslint-disable-next-line import/no-webpack-loader-syntax
  mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
  }
  if (!data) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Alert severity="warning" sx={{ mt: 4, width: "100%" }}>
          don't have places please create one!
        </Alert>
      </div>
    )
  }

  return (
    <Modal
      open={open}
      onClose={func}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container maxWidth="md">
          <Card
            sx={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <div style={{ width: "100%", height: 70, background: "orange", padding: 10 }}>
              <Typography variant="h5" color="initial" fontWeight="bold">
                {data.address}
              </Typography>
            </div>
            <div style={{ width: "100%", height: 400, paddingBottom: 10 }}>
              <ReactMapGl
                style={{ width: "100%" }}
                initialViewState={{
                  latitude: data.location.lat,
                  longitude: data.location.lng,
                  zoom: 13,
                }}
                mapboxAccessToken="pk.eyJ1IjoiaGlybzk5IiwiYSI6ImNraDA2ZmxsMzFhcjAydG9ld3B0azlrZHMifQ.Ubz7JOv5qvhB6YB1j_1QNA"
                mapStyle="mapbox://styles/mapbox/streets-v11"
              >
                <Marker longitude={data.location.lng} latitude={data.location.lat}></Marker>
              </ReactMapGl>
            </div>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                // 👇 Edit padding to further adjust position
              }}
            >
              <Button variant="contained" onClick={func}>
                close
              </Button>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </Modal>
  )
}

export default MyModal
