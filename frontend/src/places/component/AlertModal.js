import { Box, Button, Card, CardActions, CardContent, Modal, Typography } from "@mui/material"
import React from "react"

const AlertModal = ({ val, open, func, okfunc }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
  return (
    <Modal
      open={open}
      onClose={func}
      aria-labelledby="alert-modal-title"
      aria-describedby="alert-modal-description"
    >
      <Box sx={style}>
        <Card
          sx={{
            textAlign: "center",
          }}
        >
          <div style={{ width: "100%", height: 70, background: "orange", padding: 10 }}></div>
          <CardContent>
            <Typography variant="h6">Are you seriously to delete {val.title} place?</Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              // 👇 Edit padding to further adjust position
            }}
          >
            <Button variant="contained" onClick={func}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={okfunc}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  )
}

export default AlertModal
