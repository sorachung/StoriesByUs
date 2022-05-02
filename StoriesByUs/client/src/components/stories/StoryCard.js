import React from "react";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
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
            <Link component={RouterLink} color="primary" to="/">
              {story.title}
            </Link>
            <span> by </span>
            <Link component={RouterLink} color="primary" to="/">
              {story.user.displayName}
            </Link>
          </>
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <Box component="ul">Genres</Box>
          <Box component="ul">Tags</Box>
          <Box component="div">{story.summary}</Box>
          <Box component="footer" sx={{ display: "flex" }}>
            <span>Rating: {story.rating.level}</span>
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
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
