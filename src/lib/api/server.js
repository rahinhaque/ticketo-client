import baseUrl from "./baseUrl"

const serverMutation = async(path , method, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

const serverFetch = async(path) => {
  const res = await fetch(`${baseUrl}/${path}`)
  return res.json();
}


export default serverMutation;
