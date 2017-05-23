import { combineReducers } from 'redux';
import AuthReducer from './modules/Auth';
import EmployeeFormReducer from './modules/EmployeeForm';
import EmployeeReducer from './modules/Employee';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer
});
