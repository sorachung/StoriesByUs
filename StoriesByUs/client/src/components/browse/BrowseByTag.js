import React, { useState, useEffect } from "react";
import { getStoriesByTag } from "../../modules/storyManager";
import { getTagById } from "../../modules/tagManager";
import { Container } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import StoryCard from "../stories/StoryCard";

export default function BrowseByTag() {
  const [stories, setStories] = useState([]);
  const [chosenTag, setChosenTag] = useState({});
  const { tagId } = useParams();
  const history = useHistory();

  const getStories = () => {
    getStoriesByTag(tagId).then((storiesArr) => setStories(storiesArr));
  };

  const getTag = () => {
    getTagById(tagId).then((tagData) => {
      if (tagData === 404) {
        history.push("/404");
      }
      setChosenTag(tagData);
    });
  };

  useEffect(() => {
    getStories();
    getTag();
  }, [tagId]);

  return (
    <Container maxWidth="xl">
      <h1>Browse by tag: {chosenTag.name}</h1>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </Container>
  );
}
