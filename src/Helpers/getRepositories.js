import axios from "axios";

async function get(
  label = [],
  language = [],
  count = undefined,
  sort = undefined
) {
  const queryString = `https://api.github.com/search/repositories?q=${
    label.length !== 0 ? `topic:${label.join("+")}+` : ""
  }${language.length !== 0 ? `language:${language.join("+")}` : ""}${
    sort ? `&sort=${sort}` : ""
  }`;

  let response;

  if (process.env.REACT_APP_OAUTH_TOKEN) {
    response = await axios.get(queryString, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_OAUTH_TOKEN}`,
      },
    });
  } else {
    response = await axios.get(queryString);
  }

  if (count) {
    return response.data.items.slice(0, count);
  }
  return response.data.items;
}

export default get;
