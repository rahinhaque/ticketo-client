"use server";

import serverMutation from "../server";

export const addOrganization = async (data) => {
  const resData = await serverMutation("/api/organization", "POST" , data);
  return resData;
};

export const updataOrganization = async (data, id) => {
  const resData = await serverMutation(
    `/api/organizations/${id}`,
    "PATCH",
    data,
  );
  return resData;
};
