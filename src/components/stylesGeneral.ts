import {StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, scaleSize} from '../utils/scaleSize';
import {Colors} from '../constans/colors';
import {FontSize} from '../constans/fontSize';
import {Fonts} from '../constans/fonts';

export const stylesGeneral = StyleSheet.create({
  containerScreen: {
    justifyContent: 'space-around',
    minHeight: WINDOW_HEIGHT - scaleSize(80),
    paddingHorizontal: scaleSize(6),
    backgroundColor: Colors.COLOR5,
  },
  text1: {
    fontSize: FontSize.H4,
    fontFamily: Fonts.ROBOTO400,
    color: Colors.COLOR6,
  },
  input1: {
    backgroundColor: Colors.COLOR2,
    color: Colors.COLOR6,
    fontSize: FontSize.H5,
    fontFamily: Fonts.INTER500,
    borderWidth: 2,
    borderColor: Colors.COLOR1,
    borderRadius: scaleSize(8),
    width: '100%',
    height: scaleSize(36),
    paddingLeft: scaleSize(10),
  },
  input2: {
    height: scaleSize(82),
  },
  containerForm: {width: '100%', gap: scaleSize(14)},
});
