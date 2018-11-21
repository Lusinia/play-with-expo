import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../contants';


class ImagePickerComponent extends Component {
  static propTypes = {
    image: PropTypes.string,
    imageURI: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {
    hasCameraPermission: false
  };

  async componentDidMount() {
    await this.handlePermissions();
  }

  get source() {
    return this.props.image ? { uri: this.props.image } :
      { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MZOsEBfzRPaAD5dBg4Rapz_1tzpgtU3xsDbElT_EaFMiq7K7' };
  }

  async handlePermissions() {
    if (Permissions.askAsync) {
      const results = await Promise.all([
        Permissions.askAsync(Permissions.CAMERA),
        Permissions.askAsync(Permissions.CAMERA_ROLL)
      ]);

      await this.setState({ hasCameraPermission: results.every(({ status }) => status === 'granted') });
    }
  }

  openCamera = async () => {
    if (this.state.hasCameraPermission) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
        base64: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        this.props.onChange({ image: `data:image/jpg;base64,${result.base64}`, imageURI: result.uri });
      }
    }
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.openCamera}
      >
        <ImageBackground
          source={this.source}
          style={[styles.center, styles.allFull]}
        >
          <Text style={styles.plus}>+</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default ImagePickerComponent;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  plus: {
    color: colors.greyOpacity,
    fontSize: 80
  },
  allFull: {
    width: '100%',
    height: '100%'
  }
});