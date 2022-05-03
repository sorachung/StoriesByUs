import { Container, Link, Stack, Box, Typography } from "@mui/material";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import { getChapterWithStory } from "../../modules/chapterManager";
import DOMPurify from "dompurify";

export default function Chapter() {
  const [chapter, setChapter] = useState({});
  const { chapterId } = useParams();
  const { storyId } = useParams();
  const history = useHistory();

  const getChapter = () => {
    getChapterWithStory(chapterId, storyId).then((chapterData) => {
      if (chapterData === 404) {
        history.push("/404");
      }
      setChapter(chapterData);
    });
  };

  useEffect(() => {
    getChapter();
  }, [chapterId, storyId]);

  return (
    <>
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Box component="section">
            <Typography variant="h3" align="center" gutterbottom m="0.5em">
              {chapter.title}
            </Typography>
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
