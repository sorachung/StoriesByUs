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
