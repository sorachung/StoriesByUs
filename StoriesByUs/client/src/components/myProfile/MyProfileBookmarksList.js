import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import StoryCard from "../stories/StoryCard";
import {
  deleteBookmark,
  getBookmarksByUser,
  putBookmark,
} from "../../modules/bookmarkManager";

export default function MyProfileBookmarksList({ user }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [chosenBookmark, setChosenBookmark] = useState({});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBookmarks = () => {
    getBookmarksByUser(user.id).then((bookmarksData) =>
      setBookmarks(bookmarksData)
    );
  };

  const editBookmark = () => {
    putBookmark(chosenBookmark).then(getBookmarks);
  };

  const removeBookmark = () => {
    deleteBookmark(chosenBookmark.id).then(getBookmarks);
  };

  useEffect(() => {
    getBookmarks();
  }, [user.Id]);

  return (
    <Container maxWidth="xl">
      {bookmarks.map((bookmark) => (
        <Box key={bookmark.id}>
          <StoryCard key={bookmark.story?.id} story={bookmark.story} />
          <Box component="section">
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardHeader title="Notes: " />
              <CardContent>{bookmark.notes}</CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    setChosenBookmark(bookmark);
                    handleClickOpen();
                  }}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Bookmark</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="notes-field"
            label="Notes"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={chosenBookmark.notes}
            onChange={(evt) => {
              const copy = { ...chosenBookmark };
              copy.notes = evt.target.value;
              setChosenBookmark(copy);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              removeBookmark();
              handleClose();
            }}
          >
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              editBookmark();
              handleClose();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
