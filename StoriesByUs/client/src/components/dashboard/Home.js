import { Container, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getRecentStories } from "../../modules/storyManager";
import { getRecentBookmarks } from "../../modules/bookmarkManager";
import StoryCard from "../stories/StoryCard";

export default function Home() {
  const [recentStories, setRecentStories] = useState([]);
  const [recentBookmarks, setRecentBookmarks] = useState([]);

  const getAndSetRecentStories = () => {
    getRecentStories().then((storyData) => setRecentStories(storyData));
  };

  const getAndSetRecentBookmarks = () => {
    getRecentBookmarks().then((bookmarkData) =>
      setRecentBookmarks(bookmarkData)
    );
  };

  useEffect(() => {
    getAndSetRecentStories();
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
            {recentBookmarks.map((b) => (
              <StoryCard story={b.story} key={b.id} />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2}>
            <h3>Recent Stories</h3>
            {recentStories.map((s) => (
              <StoryCard story={s} key={s.id} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
