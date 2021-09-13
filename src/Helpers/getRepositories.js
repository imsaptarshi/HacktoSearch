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

  const response = await axios.get(queryString, {
    headers: {
      Authorization: `token ${process.env.REACT_APP_OAUTH_TOKEN}`,
    },
  });

  if (count) {
    return response.data.items.slice(0, count);
  }
  return response.data.items;
}

export default get;
