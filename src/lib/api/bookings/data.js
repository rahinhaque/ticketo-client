import { serverFetch } from "../server"

export const fetchMyBookings = async (email) => {
//   console.log("1. Called with email:", email);
//   console.log("Fetching:", `/api/bookings/${email}`);

  const res = await serverFetch(`/api/bookings/${email}`);
//   console.log("2. Raw API response:", res);
  return res;
}

export const fetchMyPayments = async (email) => {
    console.log("1. Called with email:", email);
    console.log("Fetching:", `/api/payments/${email}`);
  const res = await serverFetch(`/api/payments/${email}`);
  console.log("4. Raw API response:", res);
  return res;
}
