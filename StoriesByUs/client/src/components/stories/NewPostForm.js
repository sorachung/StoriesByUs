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
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { getAllRatings } from "../../modules/ratingManager";
import { getAllTags } from "../../modules/tagManager";
import { getAllGenres } from "../../modules/genreManager";
import { addChapter } from "../../modules/chapterManager";
import {
  addStory,
  addStoryGenres,
  addStoryTags,
} from "../../modules/storyManager";

export default function NewPostForm() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState(null);
  const [rating, setRating] = useState(1);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const [chapterTitle, setChapterTitle] = useState("Chapter 1");
  const [chapterBody, setChapterBody] = useState("");
  const [chapterNotes, setChapterNotes] = useState("");

  // lists from lookup tables
  const [ratingsList, setRatingsList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [genresList, setGenresList] = useState([]);

  const getRatings = () => {
    getAllRatings().then((ratingsData) => setRatingsList(ratingsData));
  };
  const getTags = () => {
    getAllTags().then((tagsData) => setTagsList(tagsData));
  };
  const getGenres = () => {
    getAllGenres().then((genresData) => setGenresList(genresData));
  };

  useEffect(() => {
    getRatings();
    getTags();
    getGenres();
  }, []);

  const publish = (evt) => {
    evt.preventDefault();
    const newStory = {
      title: title,
      summary: summary,
      notes: notes,
      rating: { id: rating },
      complete: isComplete,
    };

    addStory(newStory).then((storyData) => {
      const newChapter = {
        story: { id: storyData.id },
        title: chapterTitle,
        body: chapterBody,
        notes: chapterNotes,
        placeInOrder: 1,
      };
      Promise.all([
        addChapter(newChapter),
        addStoryTags(storyData.id, tags),
        addStoryGenres(storyData.id, genres),
      ]).then(() => history.push(`/works/${storyData.id}/chapters/1`));
    });

    //add StoryTag objects
    //add StoryGenre objects
  };

  return (
    <Container maxWidth="xl">
      <Box component="form" onSubmit={publish}>
        <Stack spacing={2}>
          <h1>Post a New Story!</h1>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                id="rating-select"
                label="Rating"
                value={rating}
                onChange={(evt) => {
                  setRating(parseInt(evt.target.value));
                }}
              >
                {ratingsList.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Autocomplete
                multiple
                disablePortal
                id="tag-autocomplete"
                onChange={(e, values) => {
                  setTags(values);
                }}
                getOptionLabel={(option) => option.name ?? option}
                options={tagsList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Tags"
                    type="search"
                    variant="outlined"
                    placeholder="Tag"
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Autocomplete
                multiple
                disablePortal
                id="genre-autocomplete"
                onChange={(e, values) => {
                  setGenres(values);
                }}
                getOptionLabel={(option) => option.name ?? option}
                options={genresList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Genres"
                    type="search"
                    variant="outlined"
                    placeholder="Genre"
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                required
                id="title"
                label="Title"
                onChange={(evt) => setTitle(evt.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                required
                id="summary"
                label="Summary"
                multiline
                onChange={(evt) => setSummary(evt.target.value)}
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
                onChange={(evt) => setNotes(evt.target.value)}
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
                onChange={(evt) => setChapterTitle(evt.target.value)}
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
                onChange={(evt) => setChapterBody(evt.target.value)}
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
                onChange={(evt) => setChapterNotes(evt.target.value)}
                rows={5}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl
              onChange={(evt) => {
                setIsComplete(evt.target.checked);
              }}
            >
              <FormControlLabel
                control={<Checkbox value={isComplete} />}
                label="Complete?"
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
