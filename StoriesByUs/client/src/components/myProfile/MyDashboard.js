import {
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";

export default function MyDashboard({ user }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h2>Bio:</h2>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleClickOpen}>
            Edit
          </Button>
        </Grid>
        <Grid item xs={12}>
          {user.bio}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Bio</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="bio-field"
            label="Bio"
            type="text"
            fullWidth
            multiline
            rows="5"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
