import { getToken } from "./authManager";

const _apiUrl = "/api/bookmark";

export const getBookmarkForStoryAndCurrentUser = (storyId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/story/${storyId}`, {
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
          "An unknown error occurred while trying to get a bookmark."
        );
      }
    })
  );
};

export const postBookmark = (bookmark) => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmark),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to edit a bookmark."
        );
      }
    })
  );
};

export const putBookmark = (bookmark) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/${bookmark.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmark),
    }).then((res) => {
      if (res.ok) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to edit a bookmark."
        );
      }
    })
  );
};

export const deleteBookmark = (id) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to delete a bookmark."
        );
      }
    })
  );
};
