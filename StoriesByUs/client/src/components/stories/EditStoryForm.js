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
import { getAllRatings } from "../../modules/ratingManager";
import { getAllTags } from "../../modules/tagManager";
import { getAllGenres } from "../../modules/genreManager";
import {
  editStory,
  editStoryGenres,
  editStoryTags,
  getStory,
} from "../../modules/storyManager";

export default function EditPostForm() {
  const { storyId } = useParams();
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then((storyData) => {
      if (storyData === 404) {
        history.push("/404");
      } else {
        setStory(storyData);
      }
    });
  }, []);

  const history = useHistory();
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [notes, setNotes] = useState();
  const [rating, setRating] = useState();
  const [tags, setTags] = useState();
  const [genres, setGenres] = useState();
  const [isComplete, setIsComplete] = useState();

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

  useEffect(() => {
    if (story.id) {
      setTitle(story.title);
      setSummary(story.summary);
      setNotes(story.notes);
      setRating(story.rating.id);
      setGenres(story.genres);
      setIsComplete(story.complete);
      for (const tag of story.tags) {
        delete tag.storyCount;
      }
      setTags(story.tags);
    }
  }, [story]);

  const edit = (evt) => {
    evt.preventDefault();
    const editedStory = {
      id: storyId,
      title: title,
      summary: summary,
      notes: notes,
      rating: { id: rating },
      complete: isComplete,
    };

    editStory(editedStory).then((storyData) => {
      Promise.all([
        editStoryTags(story.id, tags),
        editStoryGenres(story.id, genres),
      ]).then(() => history.push(`/works/${story.id}/chapters/1`));
    });
  };

  return (
    <Container maxWidth="xl">
      <Box component="form" onSubmit={edit}>
        <Stack spacing={2}>
          <h1>Edit Your Story</h1>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                id="rating-select"
                label="Rating"
                value={rating ?? ""}
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
                value={tags ?? []}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                value={genres ?? []}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                id="summary"
                label="Summary"
                multiline
                value={summary ?? ""}
                onChange={(evt) => setSummary(evt.target.value)}
                rows={5}
                InputLabelProps={{ shrink: !!summary }}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                id="storyNotes"
                label="Story Notes"
                multiline
                value={notes ?? ""}
                onChange={(evt) => setNotes(evt.target.value)}
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
                control={<Checkbox checked={isComplete ?? false} />}
                label="Complete?"
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
