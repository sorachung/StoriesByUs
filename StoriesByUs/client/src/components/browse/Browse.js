import { Container, Link, Stack, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getGenresWithStoryCountOverZero } from "../../modules/genreManager";
import { getTagsWithStoryCountOverZero } from "../../modules/tagManager";
export default function Browse() {
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);

  const getGenresWithStoryCount = () => {
    getGenresWithStoryCountOverZero().then((genreData) => setGenres(genreData));
  };

  const getTagsWithStoryCount = () => {
    getTagsWithStoryCountOverZero().then((tagData) => setTags(tagData));
  };

  useEffect(() => {
    getGenresWithStoryCount();
    getTagsWithStoryCount();
  }, []);

  return (
    <Container maxWidth="xl">
      <h1>Browse Stories</h1>
      <Stack spacing={2}>
        <Link component={RouterLink} to="/browse/all">
          <h2>Browse all</h2>
        </Link>
        <Box component="section">
          <h2>Browse by Genre</h2>
          {genres.map((g, i) => (
            <span key={g.id}>
              {i > 0 && ", "}
              <Link
                component={RouterLink}
                color="primary"
                to={`/browse/genre/${g.id}`}
              >
                {g.name} ({g.storyCount})
              </Link>
            </span>
          ))}
        </Box>
        <Box component="section">
          <h2>Browse by Tag</h2>
          {tags.map((t, i) => (
            <span key={t.id}>
              {i > 0 && ", "}
              <Link
                component={RouterLink}
                color="primary"
                to={`/browse/tag/${t.id}`}
              >
                {t.name} ({t.storyCount})
              </Link>
            </span>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
