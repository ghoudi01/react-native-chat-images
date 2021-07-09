import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
  Text,
  StatusBar
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';
import {
  Body,
  Header,
  List,
  ListItem as Item,
  ScrollableTab,
  Tab,
  Tabs,
  Title,
  Left,
  Right,
  Button,
  Fab,
  Icon,
} from "native-base";
import Img from '../Img';
import { BackIcon } from '../Icons';
import { trueTypeOf } from '../../utils';
import styles from './styles';

class ImageList extends Component {
  state = {
    imgToShow: 0,
    showImg: false,
  };

  componentDidMount() {
    const { index } = this.props;
    setTimeout(() => {
      this.scrollView.scrollTo({
        y: index * Dimensions.get('window').width,
      });
    }, 0);
  }

  showImg = () => {
    const { showImg } = this.state;
    this.setState({ showImg: !showImg });
  };

  showImgInModal = indexOfImg => {
    this.setState({ imgToShow: indexOfImg, showImg: true });
  };

  renderBackBtn = () => {
    const { setModalVisible, title } = this.props;
 {/* <TouchableOpacity
        
          style={styles.backBtnTouchableOpacity}
        >
          <Image
            source={{ uri: BackIcon }}
            resizeMode="contain"
            style={{ height: 30, marginLeft: -10 }}
          />
        </TouchableOpacity> */}
    return (
     
       
      


        <Header style={{ backgroundColor: "#fff" }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <Left
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
               
                <Button
                  transparent
                  onPress={() => setModalVisible(false)}
                >
                  <Icon type="AntDesign" name="right" style={{color: "#0E3C61",}} />
                </Button>
             
              <Title
                style={{
                  textAlign: "left",

                  /*fontFamily: "Cario-Bold",*/ 
                  flex: 1,
                }}
              >
                {"الصور"}
              </Title>
            </Left>

            <Right>
               
            </Right>
          </Header>

      
    );
  };

  renderImages = () => {
    const { images, backgroundColor } = this.props;
    const imagesToRender = images.map((img, i) => {
        
      return (
      <TouchableOpacity
        key={`List-Image-${i + 1}`}
        style={[styles.clickableImg, { backgroundColor }]}
        onPress={() => this.showImgInModal(i)}
        activeOpacity={0.8}
      >
        <Img image={img} />
      </TouchableOpacity>
    )});
    return imagesToRender;
  };

  render() {
    const { showImg, imgToShow } = this.state;
    const { images, saveOnLongPress } = this.props;

    const imageUrls = images.map(image => {
      const hasMoreData = trueTypeOf(image) === 'object';
      return { url: hasMoreData ? image.url : image };
    });

    return (
      <View style={styles.container}>
        {this.renderBackBtn()}
        <ScrollView ref={view => (this.scrollView = view)}>
          {this.renderImages()}
        </ScrollView>

        <View style={styles.modalView}>
          <Modal
            visible={showImg}
            transparent={false}
            onRequestClose={() => this.setState({ showImg: false })}
          >
            <ImageViewer
              index={imgToShow}
              loadingRender={() => (
                <ActivityIndicator size="small" color="#eee" />
              )}
              onSwipeDown={()=>this.setState({ showImg: false })}
              enableSwipeDown={true}
              imageUrls={imageUrls}
              saveToLocalByLongPress={saveOnLongPress}
              pageAnimateTime={0}
            />
          </Modal>
        </View>
      </View>
    );
  }
}

ImageList.defaultProps = {
  backgroundColor: 'lightgreen',
  index: 0,
  saveOnLongPress: true,
  setModalVisible: () => {},
  title: undefined,
};

ImageList.propTypes = {
  backgroundColor: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        caption: PropTypes.string,
        captionStyle: PropTypes.shape({}),
        overlay: PropTypes.element,
        thumbnail: PropTypes.string,
        url: PropTypes.string.isRequired,
      }).isRequired,
    ]),
  ).isRequired,
  index: PropTypes.number,
  saveOnLongPress: PropTypes.bool,
  setModalVisible: PropTypes.func,
  title: PropTypes.string,
};

export default ImageList;
