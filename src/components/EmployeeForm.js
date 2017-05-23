import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import { CardSection, Input } from './common';
import { actions as employeeFormActions } from '../store/modules/EmployeeForm';

class EmployeeForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={text => this.props.employeeUpdate({ prop: 'name', value: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
          />
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
            style={{ alignSelf: 'stretch' }}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

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
    employeeUpdate: (prop, value) => {
      dispatch(employeeFormActions.employeeUpdate(prop, value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
