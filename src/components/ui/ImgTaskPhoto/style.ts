import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';

export const styles = StyleSheet.create({
  image: {
    width: scaleSize(135),
    height: scaleSize(135),
    borderRadius: scaleSize(10),
  },
});
