import axios from "axios";

export async function getUser(url) {
  let res;
  if (process.env.REACT_APP_OAUTH_TOKEN) {
    res = await axios.get(url, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_OAUTH_TOKEN}`,
      },
    });
  } else {
    res = await axios.get(url);
  }
  return res.data;
}
