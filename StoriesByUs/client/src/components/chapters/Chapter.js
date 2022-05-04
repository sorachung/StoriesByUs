import {
  Container,
  Link,
  Stack,
  Box,
  Typography,
  Divider,
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
  }, [placeInOrder, storyId]);

  return (
    <>
      <Container maxWidth="lg">
        <Box component="section">
          <ChapterStoryInfo story={story} />
        </Box>
        <Stack spacing={2} divider={<Divider flexItem />}>
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
        </Stack>
      </Container>
    </>
  );
}
