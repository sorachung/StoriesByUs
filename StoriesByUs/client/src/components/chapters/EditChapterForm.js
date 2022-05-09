import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Select,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Link,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { deleteChapter, editChapter } from "../../modules/chapterManager";
import { useHistory } from "react-router-dom";

export default function EditChapterForm({
  chapter,
  storyId,
  numberOfChapters,
}) {
  const history = useHistory();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [notes, setNotes] = useState();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTitle(chapter.title);
    setBody(chapter.body);
    setNotes(chapter.notes);
  }, [chapter]);

  const edit = (evt) => {
    evt.preventDefault();
    const editedChapter = {
      id: chapter.id,
      title: title,
      body: body,
      notes: notes,
      story: {
        id: parseInt(storyId),
      },
    };

    editChapter(editedChapter).then(() =>
      history.push(`/works/${storyId}/chapters/${chapter.placeInOrder}`)
    );
  };

  const deleteChosenChapter = () => {
    deleteChapter(chapter.id).then(() => {
      history.push(`/users/me/stories`);
    });
  };

  if (!chapter) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Box component="form" onSubmit={edit}>
        <Stack spacing={2}>
          <h2>
            Edit Chapter {chapter.placeInOrder}: {chapter.title}
          </h2>
          <Box>
            <FormControl fullWidth>
              <TextField
                required
                id="title"
                label="Title"
                value={title ?? ""}
                InputLabelProps={{ shrink: !!title }}
                onChange={(evt) => setTitle(evt.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                required
                id="body"
                label="Body"
                multiline
                value={body ?? ""}
                onChange={(evt) => setBody(evt.target.value)}
                rows={30}
                InputLabelProps={{ shrink: !!body }}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                id="chapterNotes"
                label="Chapter Notes"
                multiline
                value={notes ?? ""}
                onChange={(evt) => setNotes(evt.target.value)}
                rows={5}
              />
            </FormControl>
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            hidden={numberOfChapters === 1 ? true : false}
          >
            Delete Chapter
          </Button>
        </Stack>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to delete this Chapter? - {chapter.title}?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              deleteChosenChapter();
              handleClose();
            }}
          >
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
