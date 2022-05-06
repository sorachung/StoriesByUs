import React, { useState, useEffect } from "react";
import { getStoriesByUser } from "../../modules/storyManager";
import { Container } from "@mui/material";
import StoryCard from "../stories/StoryCard";

export default function MyProfileStoriesList({ user }) {
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
