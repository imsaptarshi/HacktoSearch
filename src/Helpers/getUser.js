import axios from "axios";

export async function getUser(url) {
  const res = await axios.get(url, {
    headers: {
      Authorization: `token ${process.env.REACT_APP_OAUTH_TOKEN}`,
    },
  });
  return res.data;
}
