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
import { useHistory, useParams, Link as RouterLink } from "react-router-dom";
import { getStory } from "../../modules/storyManager";
import { getChaptersOfStory } from "../../modules/chapterManager";
import EditChapterForm from "./EditChapterForm";

export default function EditChapterChoice() {
  const { storyId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [chosenChapterNo, setChosenChapterNo] = useState(1);

  useEffect(() => {
    getChaptersOfStory(storyId).then((chapterData) => {
      if (chapterData === 404) {
        history.push("/404");
      } else {
        setChapters(chapterData);
      }
    });
  }, [storyId]);

  const history = useHistory();

  const edit = (evt) => {
    evt.preventDefault();
  };

  if (chapters.length === 0) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Box componter="section">
        <Stack spacing={2}>
          <h2>Choose a Chapter to edit:</h2>
          <Select
            labelId="chapter-label"
            id="chapter-select"
            label="Chapter"
            value={chosenChapterNo ?? ""}
            onChange={(evt) => setChosenChapterNo(parseInt(evt.target.value))}
          >
            {chapters.map((c) => (
              <MenuItem key={c.id} value={c.placeInOrder}>
                {c.title}
              </MenuItem>
            ))}
          </Select>

          <EditChapterForm
            chapter={chapters[chosenChapterNo - 1]}
            storyId={storyId}
            numberOfChapters={chapters.length}
          />
        </Stack>
      </Box>
    </Container>
  );
}
