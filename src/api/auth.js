import api from "./api/api";

// Register user
export const registerUser = async (formData) => {
  return await api.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // if you’re uploading image
    },
  });
};

// Login user
export const loginUser = async (credentials) => {
  return await api.post("/login", credentials);
};
