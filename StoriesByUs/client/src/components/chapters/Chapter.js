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
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { getChapter } from "../../modules/chapterManager";
import DOMPurify from "dompurify";
import ChapterStoryInfo from "./ChapterStoryInfo";
import { deleteStory, getStory } from "../../modules/storyManager";
import BookmarkDialog from "../bookmarks/BookmarkDialog";
import { getBookmarkForStoryAndCurrentUser } from "../../modules/bookmarkManager";
import { UserTypeContext } from "../user/UserTypeProvider";

export default function Chapter() {
  const { currentUserType, updateCurrentUserType } =
    useContext(UserTypeContext);
  const [chapter, setChapter] = useState({});
  const [story, setStory] = useState({});
  const { placeInOrder } = useParams();
  const { storyId } = useParams();
  const [existingBookmark, setExistingBookmark] = useState(null);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
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
    getBookmarkForStoryAndCurrentUser(storyId).then((bookmarkData) => {
      if (bookmarkData === 404) {
        setExistingBookmark(null);
      } else {
        setExistingBookmark(bookmarkData);
      }
    });
  };

  useEffect(() => {
    updateCurrentUserType();
    getAndSetChapter();
    getAndSetStory();

    window.scrollTo(0, 0);
  }, [placeInOrder, storyId]);

  useEffect(() => {
    getCurrentUserBookmark();
  }, [storyId]);

  const deleteChosenStory = () => {
    deleteStory(story.id).then(() => history.push("/browse/all"));
  };

  if (!story.chapters || !story.user) {
    return null;
  }

  return (
    <>
      <BookmarkDialog
        existingBookmark={existingBookmark}
        open={open}
        handleClose={handleClose}
        storyId={story.id}
        getCurrentUserBookmark={getCurrentUserBookmark}
      />
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          Are you sure you want to delete this Story - {story.title}?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              deleteChosenStory();
              handleCloseDelete();
            }}
          >
            Delete
          </Button>
          <Button onClick={handleCloseDelete}>Cancel</Button>
        </DialogActions>
      </Dialog>
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
                    <MenuItem key={c.placeInOrder} value={c.placeInOrder}>
                      {c.title}
                    </MenuItem>
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

            {currentUserType === 1 ? (
              <Button variant="contained" onClick={handleClickOpenDelete}>
                Delete
              </Button>
            ) : (
              ""
            )}
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
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
