import {Image, StyleProp, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import React from 'react';
import IconAddPhoto from '../../../../assets/icon_app/addPhoto.svg';
import IconFluentDelete from '../../../../assets/icon_app/fluentDelete.svg';
import IconFolderUpload from '../../../../assets/icon_app/folderUpload.svg';
import {SvgProps} from 'react-native-svg';

export type TIcon1Props = {
  style?: StyleProp<any>;
  children: any;
  onPress?: () => void;
};

const Icon1 = ({style, children, onPress}: TIcon1Props) => {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
};

export default Icon1;
