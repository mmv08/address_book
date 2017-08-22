import * as actionTypes from '../constants/users';
import { userApi } from '../mocks';

export const getUsers = () => {
  return async dispatch => {
    dispatch({ type: actionTypes.GET_USERS_REQUEST_START });

    const users = await userApi.getUsers();
    dispatch({ type: actionTypes.GET_USERS_REQUEST_SUCCESS, data: users });
  };
};

export const getUser = id => {
  return async dispatch => {
    dispatch({ type: actionTypes.GET_USER_REQUEST_START });

    const user = await userApi.getUser(id);
    dispatch({ type: actionTypes.GET_USER_REQUEST_SUCCESS, data: user });
  };
};

export const editUser = data => {
  return async dispatch => {
    dispatch({ type: actionTypes.EDIT_USER_REQUEST_START });

    const user = await userApi.editUser(data);
    dispatch({ type: actionTypes.CLOSE_EDIT_USER_MODAL});
    dispatch({ type: actionTypes.EDIT_USER_REQUEST_SUCCESS, data: user });
  };
};

export const deleteUser = id => {
  return async dispatch => {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST_START });

    await userApi.deleteUser(id);
    dispatch({ type: actionTypes.DELETE_USER_REQUEST_SUCCESS });
    dispatch(getUsers());
  };
};

export const addUser = userData => {
  return async dispatch => {
    dispatch({ type: actionTypes.ADD_USER_REQUEST_START });

    await userApi.addUser(userData);
    dispatch({ type: actionTypes.ADD_USER_REQUEST_SUCCESS });
    dispatch({ type: actionTypes.CLOSE_ADD_USER_MODAL});
    dispatch(getUsers());
  };
};
