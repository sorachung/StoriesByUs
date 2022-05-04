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
} from "@mui/material";
import { getAllRatings } from "../../modules/ratingManager";

export default function NewPostForm() {
  const [newStory, setNewStory] = useState({});
  const [rating, setRating] = useState(1);
  const [ratingsList, setRatingsList] = useState([]);

  const getRatings = () => {
    getAllRatings().then((ratingsData) => setRatingsList(ratingsData));
  };

  useEffect(() => {
    getRatings();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box component="form">
        <Stack spacing={2}>
          <h1>Post a New Story!</h1>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                id="rating-select"
                label="Rating"
                onChange={(evt) => {
                  setRating(parseInt(evt.target.value));
                }}
              >
                {ratingsList.map((r) => (
                  <MenuItem value={r.id}>{r.level}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField required id="title" label="Title" />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                required
                id="summary"
                label="Summary"
                multiline
                rows={5}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                id="storyNotes"
                label="Story Notes"
                multiline
                rows={5}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                required
                id="chapterTitle"
                label="Chapter Title"
                defaultValue="Chapter 1"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                required
                id="chapterBody"
                label="Chapter Text"
                multiline
                rows={30}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                id="chapterNotes"
                label="Chapter Notes"
                multiline
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
