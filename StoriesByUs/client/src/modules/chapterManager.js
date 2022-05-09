import { getToken } from "./authManager";

const _apiUrl = "/api/chapter";

export const getChapter = (placeInOrder, storyId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/${placeInOrder}/story/${storyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status == 404) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to get a chapter."
        );
      }
    })
  );
};

export const getChaptersOfStory = (storyId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/all/story/${storyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status == 404) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to get a chapter."
        );
      }
    })
  );
};

export const addChapter = (chapter) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chapter),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new chapter."
        );
      }
    });
  });
};

export const editChapter = (chapter) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${chapter.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chapter),
    }).then((res) => {
      if (res.ok) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to edit a chapter."
        );
      }
    });
  });
};

export const deleteChapter = (chapterId, storyId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/${chapterId}/story/${storyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to delete a chapter."
        );
      }
    })
  );
};
