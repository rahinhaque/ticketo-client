import { serverFetch } from "../server";

export const getAttendeeList = async (email) => {
  const res = await serverFetch(`/api/organizer/attendees/${email}`);
  return res;
};
