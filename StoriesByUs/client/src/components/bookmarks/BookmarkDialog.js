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
import { postBookmark, putBookmark } from "../../modules/bookmarkManager";
export default function BookmarkDialog({
  existingBookmark,
  open,
  handleClose,
  storyId,
}) {
  const [bookmark, setBookmark] = useState({ storyId: storyId });
  const addBookmark = () => {
    postBookmark(bookmark);
  };

  const editBookmark = () => {
    putBookmark(bookmark.id);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {!existingBookmark ? (
        <DialogTitle>Add Bookmark?</DialogTitle>
      ) : (
        <DialogTitle>Edit Bookmark?</DialogTitle>
      )}

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
        {!existingBookmark ? (
          <Button
            onClick={() => {
              handleClose();
              addBookmark();
            }}
          >
            Add
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleClose();
              editBookmark();
            }}
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
