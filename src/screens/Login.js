import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, ImageBackground } from 'react-native';
import keys from '../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';
import Expo from 'expo';
import {colors} from '../contants'
class Login extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: keys.GOOGLE_CLIENT_ID_ANDROID,
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log('result', result);
        this.props.actions.authUser(result);
        this.props.navigation.navigate('Home');
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <ImageBackground source={require('../../assets/leaves.png')} style={styles.container}>
        <TouchableHighlight onPress={this.signInWithGoogleAsync} style={styles.button} underlayColor="#fff">
          <Text style={styles.text}>sing in with google</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  // tasks: selectors.tasks(state),
  // isLoadingTasks: selectors.isLoadingTasks(state),
  // result: selectors.result(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    height: 60,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.green,
    fontSize: 18,
    fontFamily: 'regular'
  }
});
