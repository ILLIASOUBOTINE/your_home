import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, scaleSize} from '../utils/scaleSize';
import {Colors} from '../constans/colors';
import {FontSize} from '../constans/fontSize';
import {Fonts} from '../constans/fonts';

export const stylesGeneral = StyleSheet.create({
  containerScreen: {
    justifyContent: 'space-around',
    minHeight: WINDOW_HEIGHT,
    paddingHorizontal: scaleSize(6),
    backgroundColor: Colors.COLOR5,
  },
  text1: {
    fontSize: FontSize.H4,
    fontFamily: Fonts.ROBOTO400,
    color: Colors.COLOR6,
  },
});
