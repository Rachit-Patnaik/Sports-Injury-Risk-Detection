import axiosClient from "./axiosClient";

export const registerUser = async (payload) => {
  const response = await axiosClient.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const response = await axiosClient.post("/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosClient.get("/auth/me");
  return response.data;
};