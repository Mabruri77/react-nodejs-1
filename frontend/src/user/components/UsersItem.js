import React from "react"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import { grey } from "@mui/material/colors"
import { Grid, Typography, Alert } from "@mui/material"
import { Link } from "react-router-dom"

const UsersItem = (props) => {
  var user = props.user
  if (user.length === 0) {
    return (
      <div>
        <Alert severity="warning" sx={{ mt: 4 }}>
          User Not Found!
        </Alert>
      </div>
    )
  }
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
      {user.map((el) => (
        <Grid item xs={4} sm={4} md={4} lg={3} key={el._id}>
          <Link style={{ textDecoration: "none" }} to={`${el._id}/places`}>
            <Card
              sx={{
                background: grey[500],
                ":hover": { background: "yellow" },
                borderRadius: 2,
                mx: 4,
              }}
              color="primary"
            >
              <Grid container direction="row" columnSpacing={2}>
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src={el.image}
                    sx={{ width: 100, height: 100, my: 0.8, ml: 1 }}
                  />
                </Grid>
                <Grid item sx={{ minHeight: "20px", marginTop: 1.2 }}>
                  <Typography
                    variant="h5"
                    color="initial"
                    sx={{ paddingBottom: 0.5, fontWeight: "bold" }}
                  >
                    {el.name}
                  </Typography>
                  <Typography variant="h6" color="initial" sx={{ fontWeight: 500 }}>
                    {el.places.length} Places
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default UsersItem
