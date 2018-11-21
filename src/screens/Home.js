import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, width } from '../contants';
import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';
import { Header, ImagePicker } from './components';


const TOPICS = {
  products: {
    title: 'Продукты',
    image: <MaterialCommunityIcons name="carrot" size={32} color="#fff"/>,
    color: 'primary',
    id: 'products'
  },
  clothes: {
    title: 'Одежда',
    image: <MaterialCommunityIcons name="shopping" size={32} color="#fff"/>,
    color: 'primaryLight',
    id: 'clothes'
  },
  cafe: {
    title: 'Посиделки в кафе',
    image: <Ionicons name="ios-cafe" size={32} color="#fff"/>,
    color: 'secondary',
    id: 'cafe'
  },
  commun: {
    title: 'Коммуналка',
    image: <FontAwesome name="snowflake-o" size={32} color="#fff"/>,
    color: 'secondaryDark',
    id: 'commun'
  },
  waisted: {
    title: 'Потрачено в пустую',
    image: <Feather name="wind" size={32} color="#fff"/>,
    color: 'green',
    id: 'waisted'
  },
  travel: {
    title: 'Путешествия',
    image: <FontAwesome name="plane" size={32} color="#fff"/>,
    color: 'redLight',
    id: 'travel'
  }
};

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    result: PropTypes.object,
    actions: PropTypes.object,
    isLoadedFonts: PropTypes.bool,
    navigation: PropTypes.object
  };

  state = {
    cost: '',
    name: null,
    image: null,
    imageURI: null,
    customTopic: null,
    isCustomTopic: false,
    resultCustom: '',
    color: {
      R: 218,
      G: 165,
      B: 32
    }
  };

  get canSubmit() {
    return (this.state.name || this.state.resultCustom) && this.state.cost;
  }

  get renderCustomTopicInput() {
    return (
      <View>
        <Text style={styles.submitText}>Or type your own...</Text>
        <TextInput
          style={[styles.input,{color: colors.primaryDark}, styles.customTopic]}
          keyboardAppearance='dark'
          onBlur={this.setCustomTopic}
          underlineColorAndroid="transparent"
          onChangeText={customTopic => this.setState({ customTopic, isCustomTopic: true })}
          value={this.state.customTopic}
        />
      </View>
    );
  }

  async componentDidMount() {
    this.props.actions.getResult();
    this.startColorAnimation();
  }

  startColorAnimation() {
    setInterval(() => {
      this.setState(prevState => {
        return {
          color: {
            R: prevState.color.R > 250 ? 0 : prevState.color.R + 5,
            G: prevState.color.G > 250 ? 0 : prevState.color.G + 5,
            B: prevState.color.B > 250 ? 0 : prevState.color.B + 5,
          }
        };
      });
    }, 100);
  }

  setText = cost => {
    this.setState({ cost });
  };

  selectTopic = name => {
    this.setState({ name, isCustomTopic: false, resultCustom: '' });
  };

  setCustomTopic = () => {
    this.setState(prevState => ({ resultCustom: prevState.customTopic, customTopic: '' }));
  };

  submit = async () => {
    const { cost, name, image, resultCustom } = this.state;
    const currentName = name || resultCustom;
    await this.props.actions.setTask({
      cost: +cost,
      name: currentName,
      image
    });
    this.setState({ cost: '', name: '', image: null, resultCustom: '' });
  };

  onChangeImages = data => {
    this.setState(data);
  };

  renderButtons = () => _.map(TOPICS, item => {
    return (
      <TouchableHighlight
        style={[styles.nameButton, { backgroundColor: colors[item.color], borderColor: colors[item.color] }]}
        onPress={() => this.selectTopic(item.id)}
        key={item.title}
      >
        <View style={styles.nameButtonInner}>
          <View style={styles.image}>
            {item.image}
          </View>
          <Text style={styles.buttonText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  });

  get name() {
    const { name, resultCustom, isCustomTopic } = this.state;
    const usualTopic = name ? TOPICS[name].title : ' ';
    return isCustomTopic ? resultCustom : usualTopic;
  }

  get topInputSection() {
    const { cost, color: { R, G, B } } = this.state;
    return (
      <React.Fragment>
        <Text style={[styles.title, { color: `rgb(${R}, ${G}, ${B})`, fontFamily: 'regular' }]}>
          Keep your costs under control
        </Text>

        <View style={styles.form}>
           <TextInput
             style={styles.input}
             keyboardAppearance='dark'
             underlineColorAndroid="transparent"
             onChangeText={this.setText}
             placeholder="How much did you spend?"
             keyboardType="numeric"
             value={cost}
           />
        </View>
      </React.Fragment>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        enableOnAndroid
      >
        <Header navigation={this.props.navigation}/>
        {this.topInputSection}
        <View>
          <Text style={styles.submitText}>
            {this.name}
          </Text>
        </View>
        <View style={styles.center}>
          <View style={styles.buttonsWrapper}>
            {this.renderButtons()}
          </View>
          {this.renderCustomTopicInput}
        </View>
        <View style={styles.picker}>
          <ImagePicker
            isPermissions={this.props.isPermissions}
            onChange={this.onChangeImages.bind(this)}
            image={this.state.image}
            imageURI={this.state.imageURI}
          />
        </View>
        <View>
          <TouchableOpacity
            disabled={!this.canSubmit}
            style={[styles.submit, !this.canSubmit ? styles.disabled : null]}
            onPress={this.submit}
          >
            <View style={styles.nameButtonInner}>
              <Text style={styles.submitText}>Add cost</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


const mapStateToProps = (state) => ({
  result: selectors.result(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  form: {
    width: '90%',
    margin: 'auto',
    paddingVertical: 10
  },
  input: {
    height: 50,
    borderRadius: 5,
    borderColor: colors.red,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
    color: colors.primaryDark,
    fontFamily: 'regular'
  },
  customTopic: {
    borderColor: colors.primaryDark,
    width: 300
  },
  nameButton: {
    width: 'auto',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 5,
    marginRight: 10,
  },
  nameButtonInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightSide: {},
  imageView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 4,
    backgroundColor: 'brown'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'regular',
  },
  image: {
    marginRight: 8
  },
  wrapper: {
    position: 'relative'
  },
  submit: {
    width,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 25,
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.greenBg
  },
  submitText: {
    textAlign: 'center',
    fontFamily: 'regular',
    fontSize: 16,
    color: colors.secondary,
    marginVertical: 10
  },
  disabled: {
    backgroundColor: colors.greyOpacity,
    opacity: 0.3
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    width: width * 0.5,
    marginVertical: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
