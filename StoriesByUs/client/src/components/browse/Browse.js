import { Container, Link, Stack, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getGenresWithStoryCountOverZero } from "../../modules/genreManager";
export default function Browse() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenresWithStoryCountOverZero().then((genreData) => setGenres(genreData));
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
      </Stack>
    </Container>
  );
}
