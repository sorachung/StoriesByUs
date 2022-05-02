import React, { useState, useEffect } from "react";
import { getAllStories } from "../../modules/storyManager";
import { Container, Link } from "@mui/material";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";

export default function BrowseAll() {
  const [stories, setStories] = useState([]);

  const getStories = () => {
    getAllStories().then((storiesArr) => setStories(storiesArr));
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <Container maxWidth="xl">
      <h1>Browse: All</h1>
      {stories.map((story) => story.title)}
    </Container>
  );
}
