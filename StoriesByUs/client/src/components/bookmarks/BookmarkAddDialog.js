import { callExpression } from "@babel/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { postBookmark } from "../../modules/bookmarkManager";
export default function BookmarkAddDialog({ open, handleClose, storyId }) {
  const [bookmark, setBookmark] = useState({ storyId: storyId });
  const addBookmark = () => {
    postBookmark(bookmark);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Bookmark?</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Notes"
          type="text"
          fullWidth
          multiline
          rows={4}
          onChange={(evt) => {
            const copy = { ...bookmark };
            copy.notes = evt.target.value;
            setBookmark(copy);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleClose();
            addBookmark();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
