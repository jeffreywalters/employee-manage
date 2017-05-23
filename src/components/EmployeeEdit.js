import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Communications from 'react-native-communications'
import EmployeeForm from './EmployeeForm';
import { actions as employeeFormActions } from '../store/modules/EmployeeForm';
import { actions as employeeActions } from '../store/modules/Employee';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state = { showModal: false };
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
    this.setState({
      showModal: false
    });
  }

  onDecline() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { name, phone, shift } = state.employeeForm;
  return {
    name,
    phone,
    shift
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    employeeUpdate: ({ prop, value }) => {
      dispatch(employeeFormActions.employeeUpdate({ prop, value }));
    },
    employeeSave: ({ name, phone, shift, uid }) => {
      dispatch(employeeActions.employeeSave({ name, phone, shift, uid }));
    },
    employeeDelete: ({ uid }) => {
      dispatch(employeeActions.employeeDelete({ uid }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
