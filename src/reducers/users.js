import * as actionTypes from '../constants/users';

const initialState = {
  addUserRequestFetching: false,
  editingUserInfo: {},
  editUserRequestFetching: false,
  isAddUserModalOpen: false,
  isEditUserModalOpen: false,
  isLoading: false,
  userList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  case actionTypes.DELETE_USER_REQUEST_START:
  case actionTypes.DELETE_USER_REQUEST_SUCCESS:
  case actionTypes.GET_USERS_REQUEST_START:
    return {
      ...state,
      isLoading: !state.isLoading
    };

  case actionTypes.ADD_USER_REQUEST_START:
  case actionTypes.ADD_USER_REQUEST_SUCCESS:
    return {
      ...state,
      addUserRequestFetching: !state.addUserRequestFetching
    };

  case actionTypes.GET_USERS_REQUEST_SUCCESS:
    return {
      ...state,
      isLoading: false,
      userList: action.data
    };

  case actionTypes.OPEN_ADD_USER_MODAL:
  case actionTypes.CLOSE_ADD_USER_MODAL:
    return {
      ...state,
      isAddUserModalOpen: !state.isAddUserModalOpen
    };

  case actionTypes.OPEN_EDIT_USER_MODAL:
  case actionTypes.CLOSE_EDIT_USER_MODAL:
    return {
      ...state,
      isEditUserModalOpen: !state.isEditUserModalOpen
    };

  case actionTypes.GET_USER_REQUEST_START:
    return {
      ...state,
      isUserInfoRequestFetching: true
    };

  case actionTypes.GET_USER_REQUEST_SUCCESS:
    return {
      ...state,
      editingUserInfo: action.data,
      isUserInfoRequestFetching: false
    };

  case actionTypes.EDIT_USER_REQUEST_START:
    return {
      ...state,
      editUserRequestFetching: true
    };

  case actionTypes.EDIT_USER_REQUEST_SUCCESS:
    const userIndex = state.userList.findIndex(user => (user.id = action.data.id));
    const newUserList = [...state.userList];
    newUserList[userIndex] = action.data;
    return {
      ...state,
      editUserRequestFetching: false,
      newUserList
    };

  default:
    return state;
  }
}
