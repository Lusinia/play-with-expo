import PropTypes from 'prop-types';
import React, {PureComponent} from "react";
import { connect } from "react-redux";
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {colors} from '../contants';


class AuthLoading extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object
  };

  componentDidMount() {
    this.props.navigation.navigate(this.props.token ? "App" : "Auth");
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.greenLight} size="large"/>
      </View>
    )
  }

}

function mapStateToProps(state) {
  return {
    token: state.main.token
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps)(AuthLoading);
