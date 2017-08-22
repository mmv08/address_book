import React, { Component } from 'react';
import { Modal, DatePicker, Input, Spin } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, getUser, editUser } from '../../../actions/users';
import cn from 'classnames';

import './UserModal.scss';

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class UserModal extends Component {
  static propTypes = {
    addUser: PropTypes.func,
    closeModal: PropTypes.func,
    editUser: PropTypes.func,
    editingUser: PropTypes.number,
    editingUserInfo: PropTypes.object,
    getUser: PropTypes.func,
    isModalOpen: PropTypes.bool,
    isUserInfoRequestFetching: PropTypes.bool,
    type: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      phone_number: null,
      birthdate: null
    };
  }

  componentDidMount () {
    const { type, editingUser, getUser } = this.props;
    if (type === 'edit') getUser(editingUser);
  }

  componentWillReceiveProps (nextProps) {
    const { type } = this.props;
    if (type === 'edit') {
      this.setState({
        ...nextProps.editingUserInfo,
        birthdate: moment(nextProps.editingUserInfo.birthdate, 'DD/MM/YYYY')
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  handleBirthDateChange = birthdate => {
    this.setState({
      birthdate
    });
  };

  submitUser = () => {
    const { addUser } = this.props;
    addUser({
      ...this.state,
      birthdate: moment(this.state.birthdate).format('DD/MM/YYYY')
    });
  };

  editUserInfo = () => {
    const { editUser } = this.props;
    editUser({
      ...this.state,
      birthdate: moment(this.state.birthdate).format('DD/MM/YYYY')
    });
  };

  render () {
    const {
      isModalOpen,
      closeModal,
      loading,
      type,
      isUserInfoRequestFetching
    } = this.props;

    const { first_name, last_name, email, phone_number, birthdate } = this.state;

    const validation = [
      first_name && first_name.length > 3,
      last_name && last_name.length > 3,
      email && emailRegExp.test(email),
      phone_number && phone_number.length > 9,
      birthdate !== null
    ].filter(value => !value);

    return (
      <Modal
        title={type === 'new' ? 'Creating new user' : 'Editing user'}
        visible={isModalOpen}
        onOk={type === 'new' ? this.submitUser : this.editUserInfo}
        confirmLoading={loading}
        onCancel={closeModal}
        wrapClassName={cn({
          'create-user-modal': true,
          'not-valid': validation.length !== 0
        })}
      >
        <Spin spinning={type === 'edit' && isUserInfoRequestFetching}>
          <Input
            placeholder="First name"
            name="first_name"
            value={first_name}
            onChange={this.handleChange}
          />
          <Input
            placeholder="Last name"
            name="last_name"
            value={last_name}
            onChange={this.handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Input
            placeholder="phone_number"
            name="phone_number"
            value={phone_number}
            addonBefore="+7"
            onChange={this.handleChange}
          />
          <DatePicker
            placeholder="Birthdate"
            value={birthdate}
            onChange={this.handleBirthDateChange}
            format="DD/MM/YYYY"
          />
        </Spin>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  editingUserInfo: state.users.editingUserInfo,
  isUserInfoRequestFetching: state.users.isUserInfoRequestFetching,
  loading: state.users.editUserRequestFetching || state.users.addUserRequestFetching
});

const mapDispatchToProps = {
  addUser,
  editUser,
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
