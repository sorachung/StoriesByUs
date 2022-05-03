import React, { useState, useEffect } from "react";
import { getStoriesByGenre } from "../../modules/storyManager";
import { getGenreById } from "../../modules/genreManager";
import { Container, Link } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import StoryCard from "../stories/StoryCard";

export default function BrowseByGenre() {
  const [stories, setStories] = useState([]);
  const [chosenGenre, setChosenGenre] = useState({});
  const { genreId } = useParams();
  const history = useHistory();

  const getStories = () => {
    getStoriesByGenre(genreId).then((storiesArr) => setStories(storiesArr));
  };

  const getGenre = () => {
    getGenreById(genreId).then((genreData) => {
      if (genreData === 404) {
        history.push("/404");
      }
      setChosenGenre(genreData);
    });
  };

  useEffect(() => {
    getStories();
    getGenre();
  }, [genreId]);

  return (
    <Container maxWidth="xl">
      <h1>Browse by genre: {chosenGenre.name}</h1>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </Container>
  );
}
