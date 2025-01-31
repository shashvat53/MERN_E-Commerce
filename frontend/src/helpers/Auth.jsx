import apiInstance from "../config/axios";

export const SignUp = async (data) => {
  try {
    const response = await apiInstance.post("/sign-up", data);
    // console.log(res?.response?.data, "555");
    return response.data;
  } catch (error) {
    // console.log(error?.response, "777");
    return error.response;
  }
};

export const Loginapi = async (data) => {
  try {
    const response = await apiInstance.post("/login", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const userDetails = async () => {
  try {
    const res = await apiInstance.get("/user-details");
    return res;
  } catch (error) {
    return error;
  }
};

export const userLogout = async () => {
  try {
    const res = await apiInstance.get("/user-logout");
    // console.log("first", res.data);
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const allUsersApi = async () => {
  try {
    const res = await apiInstance.get("/all-users");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateUserApi = async (data) => {
  try {
    const res = await apiInstance.put("/update-user", data);

    return res.data;
  } catch (error) {
    console.log("lollllooo: ", error);
    return error;
  }
};
