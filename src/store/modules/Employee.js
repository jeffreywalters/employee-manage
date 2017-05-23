import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { constants as employeeFormConstants } from './EmployeeForm';


export const constants = {
  EMPLOYEES_FETCH_SUCCESS: 'employee/fetch_success'
};

export const actions = {
  employeesFetch: () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
          dispatch({ type: constants.EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
  },
  employeeSave: ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({ name, phone, shift })
        .then(() => {
          dispatch({ type: employeeFormConstants.EMPLOYEE_SAVE_SUCCESS });
          Actions.employeeList({ type: 'reset' });
        });
    };
  },
  employeeDelete: ({ uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .remove()
        .then(() => {
          Actions.employeeList({ type: 'reset' });
        });
    };
  }
};

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case constants.EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
