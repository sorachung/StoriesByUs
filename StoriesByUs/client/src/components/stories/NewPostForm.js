import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Link,
  Stack,
  Box,
  Select,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
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
        </Stack>
      </Box>
    </Container>
  );
}
