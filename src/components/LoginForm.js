import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { actions as AuthActions } from '../store/modules/Auth';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  static propTypes = {
    emailChange: React.PropTypes.func,
    passwordChange: React.PropTypes.func,
    loginUser: React.PropTypes.func,
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    error: React.PropTypes.string,
    loading: React.PropTypes.bool
  }

  onEmailChange(text) {
    this.props.emailChange(text);
  }

  onPasswordChange(text) {
    this.props.passwordChange(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    emailChange: (text) => {
      dispatch(AuthActions.emailChange(text));
    },
    passwordChange: (text) => {
      dispatch(AuthActions.passwordChange(text));
    },
    loginUser: ({ email, password }) => {
      dispatch(AuthActions.loginUser({ email, password }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
