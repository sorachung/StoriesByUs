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
} from "@mui/material";

export default function EditChapterForm({ chapter }) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [notes, setNotes] = useState();

  useEffect(() => {
    setTitle(chapter.title);
    setBody(chapter.body);
    setNotes(chapter.notes);
  }, [chapter]);

  const edit = (evt) => {
    evt.preventDefault();
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
        </Stack>
      </Box>
    </Container>
  );
}
