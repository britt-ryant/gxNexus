import * as React from "react";
import { Box, Button as MuiButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../images/galaxe/Gx-Icon-White.png";

export default function Header() {
  return (
    <Box
      className="Main-header"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        verticalAlign: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          ml: 1,
          color: "white",
          display: "flex",
          flexDirection: "row",
          verticalAlign: "center",
          alignItems: "center",
        }}
      >
        <img style={{ padding: 2, maxWidth: 30 }} src={logo} />
        <span style={{ marginLeft: 5, fontStyle: "italic" }}>Pathway</span>
      </Typography>

      <MuiButton
        sx={{ color: "#00294d", fontWeight: "bold" }}
        variant="elevated"
        startIcon={<LogoutIcon />}
      >
        Logout
      </MuiButton>
    </Box>
  );
}