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
