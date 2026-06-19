import { serverFetch } from "../server"

export const fetchMyBookings = async (email) => {
//   console.log("1. Called with email:", email);
//   console.log("Fetching:", `/api/bookings/${email}`);

  const res = await serverFetch(`/api/bookings/${email}`);
//   console.log("2. Raw API response:", res);
  return res;
}
