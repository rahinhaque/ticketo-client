import { serverFetch } from "../server";

const myOrganization = async (email) => {
  // console.log("1. Called with email:", email);
  // console.log("Fetching:", `/api/organizations/${email}`);

  const res = await serverFetch(`/api/organizations/${email}`);
  // console.log("2. Raw API response:", res);
  return res;
};

export default myOrganization;
