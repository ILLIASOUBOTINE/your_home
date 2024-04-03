import {StyleProp, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import React from 'react';
import IconAddPhoto from '../../../../assets/icon_app/addPhoto.svg';

import IconFolderUpload from '../../../../assets/icon_app/folderUpload.svg';

import {Colors} from '../../../constans/colors';
import {scaleSize} from '../../../utils/scaleSize';

export type TImgTaskProps = {
  style?: StyleProp<any>;
  onPressSelectPhoto?: () => void;
  onPressTakePhoto?: () => void;
};

const ImgTask = ({
  style,
  onPressSelectPhoto,
  onPressTakePhoto,
}: TImgTaskProps) => {
  return (
    <View style={styles.imageContainer}>
      <View style={styles.imgContainerEmpty}>
        <TouchableOpacity
          onPress={onPressSelectPhoto}
          style={{width: '100%', alignItems: 'flex-start'}}>
          <IconFolderUpload
            fill={Colors.COLOR4}
            height={scaleSize(50)}
            width={scaleSize(50)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressTakePhoto}
          style={{width: '100%', alignItems: 'flex-end'}}>
          <IconAddPhoto
            fill={Colors.COLOR4}
            height={scaleSize(50)}
            width={scaleSize(50)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImgTask;
