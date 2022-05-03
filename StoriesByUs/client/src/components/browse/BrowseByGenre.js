import React, { useState, useEffect } from "react";
import { getAllStories, getStoriesByGenre } from "../../modules/storyManager";
import { Container, Link } from "@mui/material";
import { Link as RouterLink, MemoryRouter, useParams } from "react-router-dom";
import StoryCard from "../stories/StoryCard";

export default function BrowseByGenre() {
  const [stories, setStories] = useState([]);
  const { genreId } = useParams();
  const getStories = () => {
    getStoriesByGenre(genreId).then((storiesArr) => setStories(storiesArr));
  };

  useEffect(() => {
    getStories();
  }, [genreId]);

  return (
    <Container maxWidth="xl">
      <h1>Browse by genre: </h1>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </Container>
  );
}
