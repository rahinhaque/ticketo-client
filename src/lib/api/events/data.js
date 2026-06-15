import baseUrl from "../baseUrl";
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



//mongodb query search and filtering
export const fetchEventsQuery = async ({
  search,
  category,
  location,
  sort,
} = {}) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (location) params.set("location", location);
  if (sort) params.set("sort", sort);

  const res = await fetch(`${baseUrl}/api/events?${params.toString()}`, {
    cache: "no-store",
  });
  return res.json();
};
