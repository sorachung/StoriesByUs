import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Container,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { getStory } from "../../modules/storyManager";
import { addChapter } from "../../modules/chapterManager";

export default function AddChapterForm() {
  const history = useHistory();
  const { storyId } = useParams();
  const [story, setStory] = useState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    getStory(storyId).then((storyData) => {
      if (storyData === 404) {
        history.push("/404");
      } else {
        setStory(storyData);
      }
    });
  }, [storyId]);

  const add = (evt) => {
    evt.preventDefault();
    const newChapter = {
      title: title,
      body: body,
      notes: notes,
      story: {
        id: storyId,
      },
      placeInOrder: Math.max(...story.chapters.map((c) => c.placeInOrder)) + 1,
    };
    addChapter(newChapter).then((chapterData) => {
      history.push(
        `/works/${chapterData.story.id}/chapters/${chapterData.placeInOrder}`
      );
    });
  };

  if (!story) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Box component="form" onSubmit={add}>
        <Stack spacing={2}>
          <h2>Add Chapter</h2>
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
            Publish
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
