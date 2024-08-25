import { SET_CURRENT_USER, SET_USER_LOGOUT } from "../Types";

export const loginUser = (payload: any) => {
  return {
    type: SET_CURRENT_USER,
    payload,
  };
};

export const logoutUser = () => {
  return {
    type: SET_USER_LOGOUT,
  };
};
