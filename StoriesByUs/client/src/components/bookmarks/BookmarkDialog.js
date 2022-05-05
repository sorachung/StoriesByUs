import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteBookmark,
  postBookmark,
  putBookmark,
} from "../../modules/bookmarkManager";
export default function BookmarkDialog({
  existingBookmark,
  open,
  handleClose,
  storyId,
  getCurrentUserBookmark,
}) {
  const bookmarkTemp =
    existingBookmark === null ? { storyId: storyId } : existingBookmark;
  const [bookmark, setBookmark] = useState(bookmarkTemp);
  const addBookmark = () => {
    postBookmark(bookmark).then(getCurrentUserBookmark);
  };

  const editBookmark = () => {
    putBookmark(bookmark).then(getCurrentUserBookmark);
  };

  const removeBookmark = () => {
    deleteBookmark(bookmark.id).then(getCurrentUserBookmark);
    putBookmark(bookmark).then(getCurrentUserBookmark);
  };

  useEffect(() => {
    existingBookmark === null
      ? setBookmark({ storyId: storyId })
      : setBookmark(existingBookmark);
  }, [existingBookmark]);

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
          value={bookmark.notes}
          onChange={(evt) => {
            const copy = { ...bookmark };
            copy.notes = evt.target.value;
            setBookmark(copy);
          }}
        />
      </DialogContent>
      <DialogActions>
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
          <>
            <Button
              onClick={() => {
                handleClose();
                removeBookmark();
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                handleClose();
                editBookmark();
              }}
            >
              Save
            </Button>
          </>
        )}
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
