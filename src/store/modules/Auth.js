import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const constants = {
  EMAIL_CHANGED: 'auth/email_changed',
  PASSWORD_CHANGED: 'auth/password_changed',
  LOGIN_USER_SUCCESS: 'auth/login_user_success',
  LOGIN_USER_FAIL: 'auth/login_user_fail',
  LOGIN_USER: 'auth/login_user'
};

export const actions = {
  emailChange: (text) => {
    return {
      type: constants.EMAIL_CHANGED,
      payload: text
    };
  },
  passwordChange: (text) => {
    return {
      type: constants.PASSWORD_CHANGED,
      payload: text
    };
  },
  loginUser: ({ email, password }) => {
    return (dispatch) => {
      dispatch({ type: constants.LOGIN_USER });
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => { dispatch(actions.loginUserSuccess(user)); })
        .catch((whatever) => {
          console.log(whatever);
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => dispatch(actions.loginUserSuccess(user)))
            .catch(() => dispatch(actions.loginUserFail()));
        });
    };
  },
  loginUserSuccess: (user) => {
    Actions.main();
    return {
      type: constants.LOGIN_USER_SUCCESS,
      payload: user
    };
  },
  loginUserFail: () => ({
    type: constants.LOGIN_USER_FAIL
  })
};


const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case constants.PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case constants.LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case constants.LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case constants.LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    default:
      return state;
  }
};
