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

export default function EditChapterForm({ chapter }) {
  const history = useHistory();

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
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
