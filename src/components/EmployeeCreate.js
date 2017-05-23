import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as employeeFormActions } from '../store/modules/EmployeeForm';
import { Card, Button, CardSection } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    phone: React.PropTypes.string,
    shift: React.PropTypes.string,
    employeeCreate: React.PropTypes.func
  }

  componentWillMount() {
    this.props.employeeReset();
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
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
    employeeCreate: ({ name, phone, shift }) => {
      dispatch(employeeFormActions.employeeCreate({ name, phone, shift }));
    },
    employeeReset: () => {
      dispatch(employeeFormActions.employeeRest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
