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
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getChapter } from "../../modules/chapterManager";
import DOMPurify from "dompurify";
import ChapterStoryInfo from "./ChapterStoryInfo";
import { getStory } from "../../modules/storyManager";

export default function Chapter() {
  const [chapter, setChapter] = useState({});
  const [story, setStory] = useState({});
  const { placeInOrder } = useParams();
  const { storyId } = useParams();
  const history = useHistory();
  const [chosenChapterNumber, setChosenChapterNumber] = useState(placeInOrder);

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

  useEffect(() => {
    getAndSetChapter();
    getAndSetStory();
    window.scrollTo(0, 0);
  }, [placeInOrder, storyId]);

  if (!story.chapters || !story.user) {
    return null;
  }

  return (
    <>
      <Container maxWidth="lg">
        <Stack spacing={2} divider={<Divider flexItem />}>
          <Box component="header">
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
          </Box>
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
