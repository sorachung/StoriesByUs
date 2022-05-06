import React, { useState, useEffect } from "react";
import { Container, Box, Card, CardHeader, CardContent } from "@mui/material";
import StoryCard from "../stories/StoryCard";
import { getBookmarksByUser } from "../../modules/bookmarkManager";

export default function ProfileBookmarksList({ user }) {
  const [bookmarks, setBookmarks] = useState([]);

  const getBookmarks = () => {
    getBookmarksByUser(user.id).then((bookmarksData) =>
      setBookmarks(bookmarksData)
    );
  };

  useEffect(() => {
    getBookmarks();
  }, [user.Id]);

  return (
    <Container maxWidth="xl">
      {bookmarks.map((bookmark) => (
        <Box key={bookmark.id}>
          <StoryCard key={bookmark.story?.id} story={bookmark.story} />
          <Box component="section">
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardHeader title="Notes: " />
              <CardContent>{bookmark.notes}</CardContent>
            </Card>
          </Box>
        </Box>
      ))}
    </Container>
  );
}
