import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const constants = {
  EMPLOYEE_UPDATE: 'employee_form/update',
  EMPLOYEE_CREATE: 'employee_form/create',
  EMPLOYEE_SAVE_SUCCESS: 'employee_form/save_success',
  EMPLOYEE_RESET: 'employee_form/reset'
};

export const actions = {
  employeeUpdate: ({ prop, value }) => {
    return {
      type: constants.EMPLOYEE_UPDATE,
      payload: { prop, value }
    };
  },
  employeeCreate: ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
      firebase.database().ref(`users/${currentUser.uid}/employees`)
        .push({ name, phone, shift })
        .then(() => Actions.employeeList({ type: 'reset' }))
        .then(dispatch({ type: constants.EMPLOYEE_CREATE }));
    };
  },
  employeeRest: () => ({
    type: constants.EMPLOYEE_RESET
  })
};

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case constants.EMPLOYEE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case constants.EMPLOYEE_CREATE:
      return INITIAL_STATE;
    case constants.EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    case constants.EMPLOYEE_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

