import React, { Component } from 'react';
import { Table, Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../../actions/users';
import UserModal from './UserModal';
import * as actionTypes from '../../constants/users';
import { bindActionCreators } from 'redux';

class UserList extends Component {
  static propTypes = {
    addUserRequestFetching: PropTypes.bool,
    deleteUser: PropTypes.func,
    dispatch: PropTypes.func,
    getUsers: PropTypes.func,
    isAddUserModalOpen: PropTypes.bool,
    isEditUserModalOpen: PropTypes.bool,
    isLoading: PropTypes.bool,
    userList: PropTypes.arrayOf(PropTypes.object)
  };

  constructor (props) {
    super(props);
    this.state = {
      editingUser: null
    };
  }

  componentDidMount () {
    this.props.getUsers();
  }

  openEditUserModal = id => {
    this.setState({
      editingUser: id
    });
    const { dispatch } = this.props;
    dispatch({ type: actionTypes.OPEN_EDIT_USER_MODAL });
  };

  render () {
    const {
      userList,
      isLoading,
      deleteUser,
      isAddUserModalOpen,
      dispatch,
      addUserRequestFetching,
      isEditUserModalOpen
    } = this.props;

    const { editingUser } = this.state;

    const columns = [
      {
        title: 'First name',
        dataIndex: 'first_name',
        key: 'first_name'
      },
      {
        title: 'Last name',
        dataIndex: 'last_name',
        key: 'last_name'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Birth date',
        dataIndex: 'birthdate',
        key: 'birthdate'
      },
      {
        title: 'Phone number',
        dataIndex: 'phone_number',
        key: 'phone_number'
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => {
          return (
            <div className="field-actions">
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  shape="circle"
                  icon="edit"
                  onClick={() => this.openEditUserModal(record.id)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  shape="circle"
                  icon="close"
                  onClick={() => deleteUser(record.id)}
                />
              </Tooltip>
            </div>
          );
        }
      }
    ];

    return (
      <div className="user-list-container">
        <Button
          type="primary"
          icon="plus"
          onClick={() => dispatch({ type: actionTypes.OPEN_ADD_USER_MODAL })}
        >
          Create new user
        </Button>
        <hr />
        <Table
          className="sp-selection-fixed-width families-table"
          rowKey={record => record.id}
          columns={columns}
          loading={isLoading}
          dataSource={userList}
          size="middle"
        />
        {isAddUserModalOpen
          ? <UserModal
            isModalOpen={isAddUserModalOpen}
            closeModal={() => dispatch({ type: actionTypes.CLOSE_ADD_USER_MODAL })}
            loading={addUserRequestFetching}
            type="new"
          />
          : null}
        {isEditUserModalOpen
          ? <UserModal
            isModalOpen={isEditUserModalOpen}
            closeModal={() => dispatch({ type: actionTypes.CLOSE_EDIT_USER_MODAL })}
            loading={addUserRequestFetching}
            type="edit"
            editingUser={editingUser}
          />
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addUserRequestFetching: state.users.addUserRequestFetching,
  isAddUserModalOpen: state.users.isAddUserModalOpen,
  isEditUserModalOpen: state.users.isEditUserModalOpen,
  isLoading: state.users.isLoading,
  userList: state.users.userList
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getUsers,
      deleteUser
    },
    dispatch
  ),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
