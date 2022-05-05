import React, { useState, useEffect } from "react";
import {
  getStoriesByGenre,
  getStoriesByUser,
} from "../../modules/storyManager";
import { getGenreById } from "../../modules/genreManager";
import { Container } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import StoryCard from "../stories/StoryCard";

export default function ProfileStoriesList({ user }) {
  const [stories, setStories] = useState([]);

  const getStories = () => {
    getStoriesByUser(user.id).then((storiesData) => setStories(storiesData));
  };

  useEffect(() => {
    getStories();
  }, [user.Id]);

  return (
    <Container maxWidth="xl">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </Container>
  );
}
