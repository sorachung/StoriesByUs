import { Container, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getRecentStories } from "../../modules/storyManager";
import StoryCard from "../stories/StoryCard";

export default function Home() {
  const [recentBookmarks, setRecentBookmarks] = useState([]);
  const [recentStories, setRecentStories] = useState([]);

  const getAndSetRecentBookmarks = () => {
    getRecentStories().then((storyData) => setRecentStories(storyData));
  };

  useEffect(() => {
    getAndSetRecentBookmarks();
  }, []);

  return (
    <Container maxWidth="xl" spacing={4}>
      <Grid container justifyContent="space-between">
        <Grid item xs={12}>
          <h2>Welcome to StoriesByUs!</h2>
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2}>
            <h3>Recent Bookmarks</h3>
            {recentStories.map((s) => (
              <StoryCard story={s} />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2}>
            <h3>Recent Stories</h3>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
