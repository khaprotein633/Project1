// load user

import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../Config/server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
    // console.log("data", data.user.name);
    toast.success(`Welcome ${data.user.name} !`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LoadUserFail",
      payload: error?.response?.data?.message,
    });
  }
};

export const registerUser = (dataUser) => async (dispatch) => {
  try {
    dispatch({
      type: "registerUserRequest",
    });
    const { data } = await axios.post(`${server}/user/add`,
      dataUser
    );
    console.log(data);
    dispatch({
      type: "registerUserSuccess",
      payload: data.success,
    });
    // console.log("data", data.user.name);
    toast.success(`Account registered successfully !`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "registerUserFail",
      payload: error,
    });
  }
};

export const loginUser = (dataUser) => async (dispatch) => {
  try {
    dispatch({
      type: "loginUserRequest",
    });
    const { data } = await axios.post(`${server}/user/loginUser`,
      dataUser
    );
    console.log(data);
    dispatch({
      type: "loginUserSuccess",
      payload: data,
    });
    // console.log("data", data.user.name);
    toast.success(`Welcome ${data?.name} !`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "loginUserFail",
      payload: error,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutUserRequest",
    });
    dispatch({
      type: "logoutUserSuccess",
    });
    // console.log("data", data.user.name);
    toast.success(`See you !`);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "logoutUserFail",
      payload: error,
    });
  }
};
