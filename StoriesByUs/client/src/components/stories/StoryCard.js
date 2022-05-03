import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Link,
  Stack,
  Box,
} from "@mui/material";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";

export default function StoryCard({ story }) {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardHeader
        title={
          <>
            <Link
              component={RouterLink}
              color="primary"
              to={`/works/${story.id}/chapters/${
                story.chapters.find((ch) => ch.placeInOrder === 1).id
              }`}
            >
              {story.title}
            </Link>
            <span> by </span>
            <Link
              component={RouterLink}
              color="primary"
              to={`/users/${story.user.id}`}
            >
              {story.user.displayName}
            </Link>
          </>
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <Box component="div">
            <div>
              Genres:{" "}
              {story.genres.map((g, i) => (
                <span key={g.id}>
                  {i > 0 && ", "}
                  <Link
                    component={RouterLink}
                    color="primary"
                    to={`/browse/genre/${g.id}`}
                  >
                    {g.name}
                  </Link>
                </span>
              ))}
            </div>
          </Box>
          <Box component="div">
            <div>
              Tags:{" "}
              {story.tags.map((t, i) => (
                <span key={t.id}>
                  {i > 0 && ", "}
                  <Link
                    component={RouterLink}
                    color="primary"
                    to={`/browse/tag/${t.id}`}
                  >
                    {t.name}
                  </Link>
                </span>
              ))}
            </div>
          </Box>
          <Box component="div">{story.summary}</Box>
          <Box component="footer" sx={{ display: "flex" }}>
            <span>Rating: {story.rating.level}</span>
            <Divider orientation="vertical" flexItem sx={{ m: "0 0.5em" }} />
            <span>Chapters: {story.chapters.length}</span>
            <Divider orientation="vertical" flexItem sx={{ m: "0 0.5em" }} />
            <span>Word Count: {story.wordCount}</span>
            <Divider orientation="vertical" flexItem sx={{ m: "0 0.5em" }} />
            <span>
              Updated:{" "}
              {new Date(story.lastUpdatedDateTime).toLocaleDateString()}
            </span>
            <Divider orientation="vertical" flexItem sx={{ m: "0 0.5em" }} />
            <span>
              Published:{" "}
              {new Date(story.publishedDateTime).toLocaleDateString()}
            </span>
            <Divider orientation="vertical" flexItem sx={{ m: "0 0.5em" }} />
            <span>Complete: {story.complete ? "Yes" : "No"}</span>
            <Divider orientation="vertical" flexItem sx={{ m: "0 0.5em" }} />
            <span>
              Bookmarks:{" "}
              <Link
                component={RouterLink}
                color="primary"
                to={`/works/${story.id}/bookmarks/`}
              >
                {story.bookmarks.length}
              </Link>
            </span>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
