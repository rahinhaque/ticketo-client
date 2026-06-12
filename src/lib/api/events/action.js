"use server";

import serverMutation from "../server";

export const addEvent = async (data) => {
  const resData = await serverMutation("/api/events", "POST", data);
  return resData;
};

export const updataEvent = async (data, id) => {
  const resData = await serverMutation(`/api/events${id}`, "PATCH", data);
  return resData;
};
