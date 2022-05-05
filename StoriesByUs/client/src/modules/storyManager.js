import { getToken } from "./authManager";

const _apiUrl = "/api/story";

export const getAllStories = () => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get stories."
        );
      }
    })
  );
};

export const getStoriesByGenre = (genreId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/genre/${genreId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get stories by genre."
        );
      }
    })
  );
};

export const getStoriesByTag = (tagId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/tag/${tagId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get stories by tag."
        );
      }
    })
  );
};

export const getStoriesByUser = (userId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get stories by user."
        );
      }
    })
  );
};

export const getStory = (id) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 404) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to get a story."
        );
      }
    })
  );
};

export const addStory = (story) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(story),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new story."
        );
      }
    });
  });
};

export const addStoryTags = (storyId, tags) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${storyId}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tags),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to save new tags for the story."
        );
      }
    });
  });
};

export const addStoryGenres = (storyId, genres) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${storyId}/genres`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(genres),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new genres for the story."
        );
      }
    });
  });
};
