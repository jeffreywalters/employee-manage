import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import _ from 'lodash';
import { actions as employeeActions } from '../store/modules/Employee';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    employees: _.map(state.employees, (val, uid) => {
      return { ...val, uid }; // shift: 'Monday', name: 'S', id: '12lkeifi32423kf'
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    employeesFetch: () => {
      dispatch(employeeActions.employeesFetch());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
