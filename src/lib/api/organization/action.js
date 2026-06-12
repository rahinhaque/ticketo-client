"use server";

import serverMutation from "../server";

export const addOrganization = async (data) => {
  const resData = await serverMutation("/api/organization", "POST" , data);
  return resData;
};
