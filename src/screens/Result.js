import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';
import moment from 'moment';
import { colors, width } from '../contants';


class Result extends Component {
  static propTypes = {
    result: PropTypes.object,
    tasks: PropTypes.array,
    actions: PropTypes.object,
    isLoadedFonts: PropTypes.bool,
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: 'Results',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    modalVisible: ''
  };

  async componentDidMount() {
    await this.props.actions.getTasks();
    // getResult
  }

  get emptyComponent() {
    return (
      <View>
        <Text>No tasks yet...</Text>
      </View>
    );
  }

  getDate = date => moment(date).format('DD.MM.YY');

  startPressing = item => {
    this.setState({ modalVisible: item });
  };

  onFinishPressing = () => {
    this.setState({ modalVisible: '' });
  };

  renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={[styles.column, styles.flex]}>
        <Text style={[styles.item, styles.name]}>{item.name}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.item}>{item.cost}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.item}>{this.getDate(item.date)}</Text>
      </View>
      <View style={[styles.column, styles.center]}>
        {item.image ? (
          <TouchableHighlight
            onLongPress={() => this.startPressing(item.image)}
            onHideUnderlay={this.onFinishPressing}
            underlayColor="transparent"
          >
            <Image source={{ uri: item.image }} style={styles.image}/>
          </TouchableHighlight>
        ) : null}
      </View>
    </View>
  );

  renderModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        style={styles.modal}
        visible={!!this.state.modalVisible}
        onRequestClose={() => {
        }}
      >
        <View style={styles.imageWrapp}>
          {this.state.modalVisible ? <Image source={{ uri: this.state.modalVisible }} resizeMode='contain' style={styles.full}/> : null}
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          {!this.props.isLoadingTasks ? (
            <FlatList
              data={this.props.tasks.map(item => ({ ...item, key: item._id }))}
              renderItem={this.renderItem}
              ListEmptyComponent={this.emptyComponent}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        {this.renderModal()}
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  tasks: selectors.tasks(state),
  isLoadingTasks: selectors.isLoadingTasks(state),
  result: selectors.result(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);

const IMAGE_SIZE = 25;
const ROW_HEIGHT = 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  inner: {
    width: '90%',
    flex: 1
  },
  column: {
    width: width * 0.15,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  flex: {
    width: 'auto',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: colors.greyOpacity,
    borderBottomWidth: 1,
    height: ROW_HEIGHT,
    justifyContent: 'center'
  },
  item: {
    color: colors.secondaryDark,
    fontFamily: 'regular',
    fontSize: 12,
    textAlign: 'left'
  },
  name: {
    fontSize: 14
  },
  center: {
    alignItems: 'center'
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  },
  imageWrapp: {
    width: '80%',
    padding: 15
  },
  full: {
    width: '100%',
    height: '100%'
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});