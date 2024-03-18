import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, scaleSize} from '../utils/scaleSize';
import {Colors} from '../constans/colors';

export const stylesGeneral = StyleSheet.create({
  containerScreen: {
    justifyContent: 'space-around',
    minHeight: WINDOW_HEIGHT,
    paddingHorizontal: scaleSize(6),
    backgroundColor: Colors.COLOR5,
  },
});
