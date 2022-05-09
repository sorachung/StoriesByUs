import React, { useState, useEffect } from "react";
import { deleteStory, getStoriesByUser } from "../../modules/storyManager";
import {
  Container,
  Box,
  Card,
  CardActions,
  Button,
  Stack,
  Link,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import StoryCard from "../stories/StoryCard";
import { Link as RouterLink } from "react-router-dom";

export default function MyProfileStoriesList({ user }) {
  const [stories, setStories] = useState([]);
  const [chosenStory, setChosenStory] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getStories = () => {
    getStoriesByUser(user.id).then((storiesData) => setStories(storiesData));
  };

  useEffect(() => {
    getStories();
  }, [user.Id]);

  const deleteChosenStory = () => {
    deleteStory(chosenStory.id).then(() => getStories());
  };

  return (
    <Container maxWidth="xl">
      <Stack spacing={2}>
        {stories.map((story) => (
          <Box key={story.id}>
            <StoryCard story={story} />
            <Box component="section">
              <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardActions>
                  <Link component={RouterLink} to={`/edit/works/${story.id}`}>
                    <Button variant="contained">Edit Story Info</Button>
                  </Link>
                  <Link
                    component={RouterLink}
                    to={`/edit/works/${story.id}/chapters`}
                  >
                    <Button variant="contained">Edit Chapter</Button>
                  </Link>
                  <Button variant="contained">Add Chapter</Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setChosenStory(story);
                      handleClickOpen();
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
        ))}
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to delete this Story - {chosenStory?.title}?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              deleteChosenStory();
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
