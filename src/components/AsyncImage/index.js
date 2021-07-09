import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { DefaultImage } from '../Icons';
import styles from './styles';

class AsyncImage extends Component {
  constructor(props){
    super(props);
    this.state = { error: false, loaded: false };
  }
  

  render() {
    const { source } = this.props;
    const { loaded, error } = this.state;
     
    return (
      <View style={styles.container}>
        <View style={styles.innerView}>
          <Image
            onError={() => this.setState({ error: true, loaded: false })}
            onLoad={() => this.setState({ loaded: true })}
            source={{ uri: source }}
            style={styles.img}
          />

         
        </View>
      </View>
    );
  }
}

AsyncImage.propTypes = { source: PropTypes.string.isRequired };

export default AsyncImage;
