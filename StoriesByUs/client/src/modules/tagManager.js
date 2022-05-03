import { getToken } from "./authManager";

const _apiUrl = "/api/tag";

export const getAllTags = () => {
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
          "An unknown error occurred while trying to get tags."
        );
      }
    })
  );
};

export const getTagById = (id) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/${id}`, {
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
          "An unknown error occurred while trying to get a tag."
        );
      }
    })
  );
};

export const getTagsWithStoryCountOverZero = () => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/withstorycount`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get tags with story count over zero."
        );
      }
    })
  );
};
