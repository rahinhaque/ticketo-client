import { serverFetch } from "../server";


const getEvents = async (email) => {
  // console.log("Fetching:", `/api/events/${email}`);
  const res = await serverFetch(`/api/events/${email}`);
  return res;
}

export default getEvents;


export const fetchEvents = async () => {
  const res = await serverFetch(`/api/events`);
  return res;
}

//get single event description
export const getEventDescription = async (id) => {
  const res = await serverFetch(`/api/single-events/${id}`);
  return res;
}
