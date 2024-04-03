import {Image, StyleProp, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import React from 'react';

import IconFluentDelete from '../../../../assets/icon_app/fluentDelete.svg';

import {Colors} from '../../../constans/colors';
import {scaleSize} from '../../../utils/scaleSize';

export type TImgTaskPhotoProps = {
  style?: StyleProp<any>;
  onPressDelletePhoto?: () => void;
  urlImage?: string;
};

const ImgTaskPhoto = ({
  style,
  onPressDelletePhoto,
  urlImage,
}: TImgTaskPhotoProps) => {
  return (
    <View style={styles.imageContainer}>
      <View>
        <TouchableOpacity
          onPress={onPressDelletePhoto}
          style={{position: 'absolute', zIndex: 10, right: 0}}>
          <IconFluentDelete
            style={styles.image}
            fill={Colors.COLOR7}
            height={scaleSize(50)}
            width={scaleSize(50)}
          />
        </TouchableOpacity>
        <Image
          resizeMode="cover"
          resizeMethod="scale"
          style={styles.image}
          source={{uri: urlImage}}
        />
      </View>
    </View>
  );
};

export default ImgTaskPhoto;
