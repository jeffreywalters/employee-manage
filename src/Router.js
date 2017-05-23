import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';


const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene
        key="auth"
        initial
      >
        <Scene
          key="login"
          component={LoginForm}
          title="Please login"
          initial
        />
      </Scene>
      <Scene key="main">
        <Scene
          onRight={() => Actions.EmployeeCreate()}
          rightTitle="Add"
          key="employeeList"
          component={EmployeeList}
          title="Employees"
          initial
        />
        <Scene 
          key="EmployeeCreate"
          component={EmployeeCreate}
          title="Create Employee"
        />
        <Scene 
          key="EmployeeEdit"
          component={EmployeeEdit}
          title="Edit Employee"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
