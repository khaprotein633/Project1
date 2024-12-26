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

// export const registerUser = (dataUser) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "registerUserRequest",
//     });
//     const { data } = await axios.post(`${server}/user/add`,
//       dataUser
//     );
//     console.log(data);
//     dispatch({
//       type: "registerUserSuccess",
//       payload: data.success,
//     });
//     // console.log("data", data.user.name);
//     toast.success(`Account registered successfully !`);
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: "registerUserFail",
//       payload: error,
//     });
//   }
// };

export const registerUser = (dataUser) => async (dispatch) => {
  try {
    // Gửi yêu cầu đăng ký
    dispatch({
      type: "registerUserRequest",
    });

    // Gửi dữ liệu đến API
    const { data } = await axios.post(`${server}/user/add`, dataUser);

    // Kiểm tra dữ liệu trả về từ API
    console.log(data);

    // Nếu thành công, dispatch thành công và thông báo
    dispatch({
      type: "registerUserSuccess",
      payload: data.success,
    });

    toast.success(`Account registered successfully!`);
  } catch (error) {
    console.log(error);

    // Kiểm tra lỗi từ API và lấy thông báo chi tiết
    const errorMessage = error.response && error.response.data.message
      ? error.response.data.message
      : "Something went wrong! Please try again.";

    // Dispatch lỗi và truyền thông báo lỗi từ backend
    dispatch({
      type: "registerUserFail",
      payload: errorMessage,
    });

    // Hiển thị thông báo lỗi cho người dùng
    toast.error(errorMessage);
  }
};


// export const loginUser = (dataUser) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "loginUserRequest",
//     });
//     const { data } = await axios.post(`${server}/user/loginUser`,
//       dataUser
//     );
//     console.log(data);
//     dispatch({
//       type: "loginUserSuccess",
//       payload: data,
//     });
//     // console.log("data", data.user.name);
//     toast.success(`Welcome ${data?.name} !`);
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: "loginUserFail",
//       payload: error,
//     });
//   }
// };
export const loginUser = (dataUser) => async (dispatch) => {
  try {
    dispatch({
      type: "loginUserRequest",
    });

    // Gửi yêu cầu đăng nhập
    const { data } = await axios.post(`${server}/user/loginUser`, dataUser);
    console.log(data);

    // Dispatch hành động thành công
    dispatch({
      type: "loginUserSuccess",
      payload: data,
    });

    // Hiển thị thông báo chào mừng sau khi đăng nhập thành công
    toast.success(`Welcome ${data?.name} !`);
  } catch (error) {
    console.log(error);

    // Kiểm tra nếu có lỗi từ server (error.response có thể chứa thông tin lỗi chi tiết)
    const errorMessage =
      error?.response?.data?.message || "Something went wrong. Please try again.";

    // Dispatch hành động thất bại
    dispatch({
      type: "loginUserFail",
      payload: errorMessage, // Lỗi chi tiết từ server
    });

    // Hiển thị thông báo lỗi
    toast.error(errorMessage); // Hiển thị thông báo lỗi cho người dùng
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
