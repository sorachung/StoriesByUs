import React, { useState, useEffect } from "react";
import { getStoriesByUser } from "../../modules/storyManager";
import {
  Container,
  Box,
  Card,
  CardActions,
  Button,
  Stack,
  Link,
} from "@mui/material";
import StoryCard from "../stories/StoryCard";
import { Link as RouterLink } from "react-router-dom";

export default function MyProfileStoriesList({ user }) {
  const [stories, setStories] = useState([]);
  const [chosenStory, setChosenStory] = useState({});

  const getStories = () => {
    getStoriesByUser(user.id).then((storiesData) => setStories(storiesData));
  };

  useEffect(() => {
    getStories();
  }, [user.Id]);

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

                  <Button variant="contained">Edit Chapter</Button>
                  <Button variant="contained">Add Chapter</Button>
                  <Button variant="contained">Delete</Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
