import {
  Container,
  Link,
  Stack,
  Box,
  Typography,
  Divider,
  Button,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getChapter } from "../../modules/chapterManager";
import DOMPurify from "dompurify";
import ChapterStoryInfo from "./ChapterStoryInfo";
import { getStory } from "../../modules/storyManager";
import BookmarkDialog from "../bookmarks/BookmarkDialog";
import { getBookmarkForStoryAndCurrentUser } from "../../modules/bookmarkManager";

export default function Chapter() {
  const [chapter, setChapter] = useState({});
  const [story, setStory] = useState({});
  const { placeInOrder } = useParams();
  const { storyId } = useParams();
  const [existingBookmark, setExistingBookmark] = useState(null);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAndSetChapter = () => {
    getChapter(placeInOrder, storyId).then((chapterData) => {
      if (chapterData === 404) {
        history.push("/404");
      }
      setChapter(chapterData);
    });
  };

  const getAndSetStory = () => {
    getStory(storyId).then((storyData) => {
      if (storyData === 404) {
        history.push("/404");
      }
      setStory(storyData);
    });
  };

  const getCurrentUserBookmark = () => {
    getBookmarkForStoryAndCurrentUser(story.id).then((bookmarkData) => {
      if (bookmarkData === 404) {
        setExistingBookmark(null);
      }
      setExistingBookmark(bookmarkData);
    });
  };

  useEffect(() => {
    getAndSetChapter();
    getAndSetStory();

    window.scrollTo(0, 0);
  }, [placeInOrder, storyId]);

  useEffect(() => {
    getCurrentUserBookmark();
  }, [storyId]);

  if (!story.chapters || !story.user) {
    return null;
  }

  return (
    <>
      <Container maxWidth="lg">
        <Stack spacing={2} divider={<Divider flexItem />}>
          <Stack direction="row" spacing={1}>
            {chapter.placeInOrder === 1 ? (
              ""
            ) : (
              <Link
                component={RouterLink}
                to={`/works/${storyId}/chapters/${chapter.placeInOrder - 1}`}
              >
                <Button variant="contained">Previous Chapter</Button>
              </Link>
            )}
            {story.chapters.length === 1 ? (
              ""
            ) : (
              <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select
                  id="demo-simple-select"
                  value={placeInOrder}
                  onChange={(event) =>
                    history.push(
                      `/works/${storyId}/chapters/${event.target.value}`
                    )
                  }
                >
                  {story.chapters.map((c) => (
                    <MenuItem value={c.placeInOrder}>{c.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {chapter.placeInOrder === story.chapters?.length ? (
              ""
            ) : (
              <Link
                component={RouterLink}
                to={`/works/${storyId}/chapters/${chapter.placeInOrder + 1}`}
              >
                <Button variant="contained">Next Chapter</Button>
              </Link>
            )}
            {existingBookmark ? (
              <Button variant="contained" onClick={handleClickOpen}>
                Edit Bookmark
              </Button>
            ) : (
              <Button variant="contained" onClick={handleClickOpen}>
                Bookmark
              </Button>
            )}

            <BookmarkDialog
              existingBookmark={existingBookmark}
              open={open}
              handleClose={handleClose}
              storyId={story.id}
            />
          </Stack>
          <Box component="section">
            <ChapterStoryInfo story={story} />
          </Box>
          <Box component="section">
            <Typography variant="h4" align="center" mt="0.5em">
              {story.title}
            </Typography>
            <Typography variant="h6" align="center">
              <Link
                component={RouterLink}
                color="primary"
                to={`/users/${story.user?.id}`}
              >
                {story.user?.displayName}
              </Link>
            </Typography>
          </Box>
          <Box component="section">
            <Typography variant="h5" align="center" m="0.5em">
              Chapter {chapter.placeInOrder}: {chapter.title}
            </Typography>
          </Box>
          <Box component="section">
            <Typography
              component="article"
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(chapter.body),
              }}
            ></Typography>
          </Box>
          <Box component="footer">
            {chapter.placeInOrder === 1 ? (
              ""
            ) : (
              <Link
                component={RouterLink}
                to={`/works/${storyId}/chapters/${chapter.placeInOrder - 1}`}
              >
                <Button variant="contained">Previous Chapter</Button>
              </Link>
            )}
            {chapter.placeInOrder === story.chapters?.length ? (
              ""
            ) : (
              <Link
                component={RouterLink}
                to={`/works/${storyId}/chapters/${chapter.placeInOrder + 1}`}
              >
                <Button variant="contained">Next Chapter</Button>
              </Link>
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );
}
