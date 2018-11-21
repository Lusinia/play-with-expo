import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { colors } from '../../contants';
import PropTypes from 'prop-types';
import * as actions from '../../redux/actions';
import * as selectors from '../../redux/selectors';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class Header extends PureComponent {
  static propTypes = {
    debit: PropTypes.number,
    spent: PropTypes.number,
    actions: PropTypes.object,
    navigation: PropTypes.object
  };

  state = {
    isInputVisible: false,
    text: ''
  };

  toggleDebitInput = () => {
    this.setState(prevState => ({ isInputVisible: !prevState.isInputVisible }), () => {
      if (this.state.isInputVisible && this.inputRef) {
        this.inputRef.focus();
      } else {
        this.clearText();
      }
    });
  };

  setText = text => {
    this.setState({ text });
  };

  submit = () => {
    this.props.actions.changeDebit(this.state.text);
    this.clearText();
  };

  clearText = () => {
    this.setState({ text: '' });
  };

  goResults = () => {
    this.props.navigation.navigate('Result');
  };

  exit = () => {
    this.props.actions.logout();
    this.props.navigation.navigate('AuthLoading');
  };

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.inner}>
          <View style={styles.flex}>
            {!this.state.isInputVisible && (
              <TouchableHighlight onPress={this.toggleDebitInput} underlayColor="transparent">
                <View>
                  <Text style={[styles.text, styles.title]}>Debit</Text>
                  <Text style={styles.text}>{this.props.debit}</Text>
                </View>
              </TouchableHighlight>
            )}
            <View>
              {this.state.isInputVisible && (
                <TextInput
                  ref={ref => this.inputRef = ref}
                  style={styles.input}
                  keyboardAppearance='dark'
                  underlineColorAndroid="transparent"
                  onChangeText={this.setText}
                  onBlur={this.toggleDebitInput}
                  onSubmitEditing={this.submit}
                  placeholder="99"
                  keyboardType="numeric"
                  value={this.state.text}
                />
              )}
            </View>
            <View>
              <Text style={[styles.text, styles.red, styles.title]}>Spent</Text>
              <Text style={[styles.text, styles.red]}>{this.props.spent}</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <TouchableHighlight onPress={this.goResults} underlayColor="transparent">
              <MaterialCommunityIcons name="cash-usd" size={38} color={colors.warning}/>
            </TouchableHighlight>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity onPress={this.exit} activeOpacity={1}>
              <MaterialCommunityIcons name="exit-to-app" color={colors.red} size={40}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: 'flex-end',
    borderBottomColor: colors.primaryDark,
    borderBottomWidth: 1,
    alignItems: 'center',
    width: '100%'
  },
  inner: {
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 13,
    color: colors.green,
    fontFamily: 'regular',
    textAlign: 'center'
  },
  red: {
    color: colors.red,
    paddingLeft: 10
  },
  icon: {
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  title: {
    fontSize: 10
  },
  input: {
    width: 'auto',
    minWidth: 50,
    height: 30,
    fontSize: 14,
    fontFamily: 'regular',
    borderWidth: 1,
    borderColor: colors.greenLight,
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  flex: {
    flex: 1,
    flexDirection: 'row'
  }
});


const mapStateToProps = (state) => ({
  debit: selectors.debit(state),
  spent: selectors.spent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);