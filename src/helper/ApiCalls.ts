import Axios from "axios";
// require("dotenv").config();
const BASE = process.env.REACT_APP_BACKEND;

//signin

export const signin = async (user: { username: string; password: string }) => {
  try {
    const result: any = await Axios.post(`${BASE}signIn`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (err) {
    return err;
  }
};

//browser does not rememebr json res
//set token in user browser
export const authenticate = (
  data: {
    token: string;
    user: {
      _id: string;
      username: string;
    };
  },
  next: () => void
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data.token));
    localStorage.setItem("id", JSON.stringify(data.user._id));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")!);
  } else {
    return false;
  }
};

// appointments
// 1.create
export const createAppointment = async (token: any, data: any) => {
  try {
    const response = await Axios.post(
      `${BASE}appointment/create/`,
      { ...data },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
// 2.view
export const getAllAppointments = async () => {
  const response = await Axios.get(`${BASE}/appointment/view`);
  return response.data;
};

// Bookings
// 1.create
export const createBooking = async (data: any) => {
  try {
    const response = await Axios.post(`${BASE}/booking/create/`, {
      ...data,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
// 2.view
export const getAllBookings = async () => {
  const response = await Axios.get(`${BASE}/booking/view`);
  return response.data ?? [];
};
